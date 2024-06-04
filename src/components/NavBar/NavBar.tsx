import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";

interface HeaderButtonProps {
  route: string;
  title: string;
}

const HeaderButton = ({ route, title }: HeaderButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`tab ${location.pathname == `${route}` ? "active" : ""}`}
      onClick={() => {
        navigate(route);
      }}
    >
      {title}
    </button>
  );
};

export const NavBar = () => (
  <div className="search-tabs">
    <HeaderButton route="/addWH" title="Создать склад" />
    <HeaderButton route="/addCategory" title="Создать категорию" />
    <HeaderButton route="/createProduct" title="Создать оборудование" />
    <HeaderButton route="/product" title="Поиск оборудования" />
    <HeaderButton route="/ordersHistory" title="История заказов" />
  </div>
);
