import { ChangeEvent, useEffect, useState } from "react";
import "./ProductPage.scss";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductCard } from "./ProductCard/ProductCard";
import { NavBar } from "../../components/NavBar/NavBar";
import { Header } from "../../components/Header/Header";
import { Product } from "../../types/Product";
import { PageContainer } from "../../layout/PageContainer/PageContainer";

export function ProductPage() {
  const [product, setProduct] = useState<Product[]>([]);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500); //для задержки при вводе фильтра
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setServerErrorMessage("");
  };
  async function fetchProduct(filter = "") {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch(
      "http://localhost:5000/product/?filter=" + filter,
      {}
    );

    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404) {
      setServerErrorMessage("Оборудование не найдено");
      setProduct([]);
      return;
    } else {
      setProduct(data);
    }
  }
  useEffect(() => {
    // alert(debouncedValue)
    fetchProduct(debouncedValue);
  }, [debouncedValue]);
  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className="search-container">
          <input
            onChange={handleChange}
            value={value}
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="Начните вводить"
          />
          <img
            id="searchButton"
            className="search-button"
            src="https://palantinnsk.ru/local/templates/palantinnsk/assets/search.png"
            alt="Search"
          />
        </div>
        <br></br>
        <span>{serverErrorMessage}</span>
        <div className="card-container">
          {product.map((product) => {
            return (
              <ProductCard productName={product.name} productId={product.id} />
            );
          })}
          {/* вытаскиваем массив и распределяем по карточкам */}
        </div>
      </PageContainer>
    </div>
  );
}
