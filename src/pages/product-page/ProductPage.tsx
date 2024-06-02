import { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductCard } from "./ProductCard/ProductCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";
import { Product } from "../../types/Product";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import { Category } from "../../types/Category";
import { useSearchParams } from "react-router-dom";
import { CategoryAttribute, Filter, Range } from "../../types/Attribute";
import axios from "axios";

interface GetCategoryAttsResponse {
  atts: CategoryAttribute[];
}

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500); // для задержки при вводе фильтра
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelectValue, setCategorySelectValue] = useState<string>("all");
  const [attrs, setAttrs] = useState<CategoryAttribute[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isQueryParamsGot, setIsQueryParamsGot] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategorySelectValue(categoryParam);
    }
    setIsQueryParamsGot(true);
    getCategories();
  }, []);

  useEffect(() => {
    if (isQueryParamsGot) {
      setSearchParams({
        category: categorySelectValue.toString(),
      });
      getAttrsByCategory(categorySelectValue);
      fetchProduct(debouncedValue);
    }
  }, [categorySelectValue, isQueryParamsGot]);

  useEffect(() => {
    let initialFilters: Filter[] = attrs.map((attr) => {
      const typedfilter =
        attr.type === "boolean"
          ? {
              var_boolean: true,
            }
          : {
              range_min: 0,
              range_max: 0,
            };
      return {
        id: attr.id,
        name: attr.name,
        type: attr.type,
        ...typedfilter,
      };
    });
    setFilters(initialFilters);
  }, [attrs]);

  useEffect(() => {
    fetchProduct(debouncedValue, filters);
  }, [filters]);

  useEffect(() => {
    if (isQueryParamsGot) {
      fetchProduct(debouncedValue);
    }
  }, [debouncedValue, isQueryParamsGot]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setServerErrorMessage("");
  };

  const onRangeChange =
    (filter: Filter, range: "min" | "max") =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilters((prevFilters) =>
        prevFilters.map((prevFilter) =>
          prevFilter.id === filter.id
            ? {
                ...filter,
                range_min:
                  range === "min"
                    ? Number(e.target.value)
                    : prevFilter.range_min,
                range_max:
                  range === "max"
                    ? Number(e.target.value)
                    : prevFilter.range_max,
              }
            : prevFilter
        )
      );

  const onCheckboxChange =
    (filter: Filter) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === filter.id
            ? { ...filter, var_boolean: e.target.checked }
            : filter
        )
      );

  async function getAttrsByCategory(category: string) {
    try {
      if (category !== "all") {
        const response = await axios.get<GetCategoryAttsResponse>(
          `http://localhost:5000/category/getCategoriesAtts/${category}`
        );
        setAttrs(response.data.atts);
      } else {
        setAttrs([]);
      }
    } catch (err) {
      setAttrs([]);
    }
  }

  async function fetchProduct(search: string = "", filters?: Filter[]) {
    try {
      const searchAttrs = (filters || []).reduce((acc, filter) => {
        if (filter.type === "boolean") {
          acc[filter.id] = filter.var_boolean;
        }
        return acc;
      }, {} as { [key: number]: any });
      const ranges = (filters || []).reduce((acc, filter) => {
        if (filter.type === "integer" || filter.type === "real") {
          acc.push({
            id_att: filter.id,
            minValue: filter.range_min || 0,
            maxValue: filter.range_max || 99999999,
          });
        }
        return acc;
      }, [] as Range[]);
      const response = await axios.get("http://localhost:5000/product", {
        params: {
          filter: search,
          c_id: categorySelectValue !== "all" ? categorySelectValue : "",
          searchAttrs: JSON.stringify(searchAttrs),
          ranges: JSON.stringify(ranges),
        },
      });
      setProducts(response.data);
    } catch (err) {
      setProducts([]);
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get(`http://localhost:5000/category`);
      setCategories(response.data);
    } catch (err) {
      setCategories([]);
    }
  }

  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className={styles.searchContainer}>
          <input
            onChange={onSearchChange}
            value={value}
            type="text"
            id="searchInput"
            className={styles.searchInput}
            placeholder="Начните вводить"
          />
          <img
            id="searchButton"
            className={styles.searchButton}
            src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png"
            alt="Search"
          />
        </div>
      </PageContainer>

      <span>{serverErrorMessage}</span>
      <div className={styles.filterSearch}>
        <div className={styles.filterMenu}>
          <select
            className={styles.select}
            name="Category"
            id="Category"
            value={categorySelectValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategorySelectValue(e.target.value);
            }}
          >
            <option selected value="all">
              -- Все категории --
            </option>

            {categories.map((category: Category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.name}
              </option>
            ))}
          </select>
          <div className={styles.atts}>
            {filters.map((filter) => {
              if (filter.type === "integer" || filter.type === "real") {
                return (
                  <div key={filter.id}>
                    <h4 className={styles.attlabel}>
                      <label htmlFor={filter.name}>{filter.name}</label>
                    </h4>
                    <div className={styles.rangeContainer}>
                      <div className={styles.inputContainer}>
                        <label>От</label>
                        <input
                          className={styles.attsinput}
                          type="number"
                          min={0}
                          id={filter.id.toString()}
                          value={filter.range_min}
                          onChange={onRangeChange(filter, "min")}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <label>до</label>
                        <input
                          className={styles.attsinput}
                          type="number"
                          min={filter.range_min}
                          id={filter.name}
                          value={filter.range_max}
                          onChange={onRangeChange(filter, "max")}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (filter.type === "boolean") {
                return (
                  <div key={filter.id} className={styles.inputContainer}>
                    <h4 className={styles.attlabel}>
                      <label htmlFor={filter.name}>{filter.name}</label>
                    </h4>
                    <input
                      type="checkbox"
                      id={filter.id.toString()}
                      checked={filter.var_boolean}
                      onChange={onCheckboxChange(filter)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.cardContainer}>
          {products.length ? (
            products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  productName={product.name}
                  productId={product.id}
                />
              );
            })
          ) : (
            <h2>Оборудование не найдено</h2>
          )}
          {/* вытаскиваем массив и распределяем по карточкам */}
        </div>
      </div>
    </div>
  );
}
