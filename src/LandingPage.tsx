import "./App.scss";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.landingContainer}>
          <h1>Добро пожаловать в Warehouse Heaven</h1>
          <p>Управляйте товарами быстро и практично!</p>
          <NavBar />
          <div className={styles.servicesContainer}>
            <div className={styles.service}>
              <h2>Создавайте заказы и поставки оборудования</h2>
              <p>
                Заказы товаров посетителями и поставки новых товаров на склад
                нужно контролировать и вести отчет. В нашей системе это можно
                сделать быстро и удобно.
              </p>
            </div>
            <div className={styles.service}>
              <h2>Создание нового оборудования</h2>
              <p>
                При появлении новых товаров можно внести их в систему для
                управления поставками и заказами.
              </p>
            </div>
            <div className={styles.service}>
              <h2>История заказов</h2>
              <p>
                Смотрите историю уже произошедших заказов в истории для
                аналитики, отчетности или иных целей.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.decorativeLine} />
          <div className={styles.footerInfo}>
            <div className={styles.contactInfo}>
              <h3>Контакты</h3>
              <p>
                <i className="fas fa-envelope"></i>
                Email: info@warehouseheaven.com
              </p>
              <p>
                <i className="fas fa-phone"></i>Phone: +7 111-222-3344
              </p>
            </div>
            <div className={styles.socialMedia}>
              <h3>Подпишитесь на нас</h3>
              <p>
                <i className="fab fa-facebook"></i>Facebook |
                <i className="fab fa-twitter"></i>Twitter |
                <i className="fab fa-instagram"></i>Instagram
              </p>
            </div>
          </div>
          <div className={styles.decorativeLine} />
          <p>&copy; 2024 Warehouse Heaven. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
