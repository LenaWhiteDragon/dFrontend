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
import { Attribute, CategoryAttribute } from "../../types/Attribute";
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
  const [filters, setFilters] = useState<Attribute[]>([]);
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
    let initialFilters: Attribute[] = [...attrs];
    initialFilters = initialFilters.map((attr) => {
      if (attr.type === "boolean") attr.var_boolean = true;
      return attr;
    });
    console.log(initialFilters);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setServerErrorMessage("");
  };

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

  async function fetchProduct(search: string = "", Attrs?: Attribute[]) {
    try {
      const searchAttrs = (Attrs || []).reduce((acc, attr) => {
        switch (attr.type) {
          case "boolean":
            acc[attr.id] = attr.var_boolean;
            break;
          case "integer":
            acc[attr.id] = attr.var_integer;
            break;
          case "real":
            acc[attr.id] = attr.var_real;
            break;
          default:
            break;
        }
        return acc;
      }, {} as { [key: number]: any });
      const response = await axios.get("http://localhost:5000/product", {
        params: {
          filter: search,
          c_id: categorySelectValue !== "all" ? categorySelectValue : "",
          searchAttrs: JSON.stringify(searchAttrs),
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
            onChange={handleChange}
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
            {filters.map((att) => {
              if (att.type === "integer" || att.type === "real") {
                return (
                  <div key={att.id}>
                    <h4 className={styles.attlabel}>
                      <label htmlFor={att.name}>{att.name}</label>
                    </h4>
                    <div className={styles.rangeContainer}>
                      <div className={styles.inputContainer}>
                        <label>От</label>
                        <input
                          className={styles.attsinput}
                          type="number"
                          id={att.name}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <label>до</label>
                        <input
                          className={styles.attsinput}
                          type="number"
                          id={att.name}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else if (att.type === "boolean") {
                return (
                  <div key={att.id} className={styles.inputContainer}>
                    <h4 className={styles.attlabel}>
                      <label htmlFor={att.name}>{att.name}</label>
                    </h4>
                    <input
                      type="checkbox"
                      id={att.id.toString()}
                      checked={att.var_boolean}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFilters((prevFilters) =>
                          prevFilters.map((filter) =>
                            filter.id === att.id
                              ? { ...filter, var_boolean: e.target.checked }
                              : filter
                          )
                        )
                      }
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
