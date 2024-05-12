import { useLocation, useNavigate } from "react-router-dom";
import './NavBar.scss';

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
    <div className="search-tabs">
      <button
        className={`tab ${location.pathname == "/clinics" ? "active" : ""}`}
        onClick={() => {
          navigate("/clinics");
        }}
      >
        По поликлиникам
      </button>
      <button
        className={`tab ${location.pathname == "/doctors" ? "active" : ""}`}
        onClick={() => {
          navigate("/doctors");
        }}
      >
        По врачам
      </button>
      <button
        className={`tab ${location.pathname == "/product" ? "active" : ""}`}
        onClick={() => {
          navigate("/product");
        }}
      >
        По услугам
      </button>
    </div>
  );
};
