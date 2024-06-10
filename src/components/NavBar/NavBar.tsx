import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { authStorage } from "../../features/auth/authStorage";
import { UserRole } from "../../types/UserRole";

interface HeaderButtonProps {
  route: string;
  title: string;
  availableRoles: UserRole[];
}

const HeaderButton = ({ route, title, availableRoles }: HeaderButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return availableRoles.includes(Number(authStorage.roleId)) ? (
    <button
      className={`tab ${location.pathname == `${route}` ? "active" : ""}`}
      onClick={() => {
        navigate(route);
      }}
    >
      {title}
    </button>
  ) : null;
};

export const NavBar = () => (
  <div className="search-tabs">
    <HeaderButton
      route="/addWH"
      title="Создать склад"
      availableRoles={[UserRole.Whboss, UserRole.Admin]}
    />
    <HeaderButton
      route="/addCategory"
      title="Создать категорию"
      availableRoles={[UserRole.Whman, UserRole.Whboss, UserRole.Admin]}
    />
    <HeaderButton
      route="/createProduct"
      title="Создать оборудование"
      availableRoles={[UserRole.Whman, UserRole.Whboss, UserRole.Admin]}
    />
    <HeaderButton
      route="/product"
      title="Поиск оборудования"
      availableRoles={[
        UserRole.Operator,
        UserRole.Whman,
        UserRole.Whboss,
        UserRole.Admin,
      ]}
    />
    <HeaderButton
      route="/ordersHistory"
      title="История заказов"
      availableRoles={[
        UserRole.Operator,
        UserRole.Whman,
        UserRole.Whboss,
        UserRole.Admin,
      ]}
    />
  </div>
);
