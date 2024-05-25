import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="search-tabs">
      <button
        className={`tab ${location.pathname == "/addWH" ? "active" : ""}`}
        onClick={() => {
          navigate("/addWH");
        }}
      >
        Добавить склад
      </button>
      <button
        className={`tab ${location.pathname == "/addCategory" ? "active" : ""}`}
        onClick={() => {
          navigate("/addCategory");
        }}
      >
        Добавить категорию
      </button>
      <button
        className={`tab ${location.pathname == "/product" ? "active" : ""}`}
        onClick={() => {
          navigate("/product");
        }}
      >
        Поиск оборудования
      </button>
      <button
        className={`tab ${
          location.pathname == "/ordersHistory" ? "active" : ""
        }`}
        onClick={() => {
          navigate("/ordersHistory");
        }}
      >
        История заказов
      </button>
    </div>
  );
};
