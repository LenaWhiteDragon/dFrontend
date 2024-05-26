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
import axios from "axios";

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500); //для задержки при вводе фильтра
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySelectValue, setCategorySelectValue] = useState<string>("");
  const [isQueryParamsGot, setIsQueryParamsGot] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    const myParam = searchParams.get("category");
    setIsQueryParamsGot(true);
    setCategorySelectValue(myParam || "");
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setServerErrorMessage("");
  };

  useEffect(() => {
    if (isQueryParamsGot) {
      setSearchParams({ category: categorySelectValue.toString() });
    }
    fetchProduct(debouncedValue);
  }, [categorySelectValue]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // alert(debouncedValue)
    fetchProduct(debouncedValue);
  }, [debouncedValue]);

  async function fetchProduct(filter: string = "") {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))

    try {
      const response = await axios.get("http://localhost:5000/product", {
        params: {
          filter: filter,
          c_id: categorySelectValue !== "all" ? categorySelectValue : "",
        },
      });
      setProducts(response.data);
    } catch (err) {
      setProducts([]);
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get(`http://localhost:5000/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
              <option value={category.id_category}>{category.name}</option>
            ))}
          </select>
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
