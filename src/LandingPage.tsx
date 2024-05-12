import React, { ReactNode, useEffect } from "react";
import "./App.scss";
import "./LandingPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { authStorage, signOut } from "./authStorage";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
//import { Button, Modal, ModalBody } from "reactstrap";

/*const MyModal = ({ children, trigger }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      {React.cloneElement(trigger, { onClick: toggle })}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
}; */

// function logOut() {
//   if (window.confirm("Вы уверены, что хотите выйти?") ){
//     authStorage.token = "";
//     authStorage.userName = "";
//     window.location.href = "/";
//   }
// }

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="auth-block">
        <div className="landing-container">
          {/* <div>  {authStorage.token}</div> */}
          <h1>Welcome to Aegle Polyclinic</h1>
          <p>Ваш надежный партнер в сфере здравоохранения</p>
          <div>
            {authStorage.token == "" ? (
              <div></div>
            ) : (
              <div>
                <p>Вы вошли в систему!</p>
                <a className="lka" onClick={() => navigate("/my")}>
                  &gt;&gt;&gt;В ЛИЧНЫЙ КАБИНЕТ&lt;&lt;&lt;
                </a>
              </div>
            )}
          </div>
          {/*пока что временная вещь, здесь только будет переход на лк пациента
          
        <img myadmin myclinic my 
            className="clinic-image"
            src="http://klublady.ru/uploads/posts/2022-07/thumbs/1658582446_18-klublady-ru-p-posokh-asklepiya-tatu-eskiz-foto-18.jpg"
            alt="Clinic Image"
          /> */}
          <NavBar/>
          <p>
            Мы предлагаем широкий спектр медицинских услуг для обеспечения
            вашего благополучия. Наша команда опытных врачей и персонала
            стремится предоставить высококачественную помощь в комфортных
            условиях.
          </p>
          <div className="services-container">
            <div className="service">
              <h2>Общая медицина</h2>
              <p>
                Комплексная медицинская помощь для взрослых и детей, включая
                профилактические услуги, регулярные обследования и лечение общих
                заболеваний.
              </p>
            </div>
            <div className="service">
              <h2>Специализированные клиники</h2>
              <p>
                Специализированные клиники по различным медицинским состояниям,
                где работают эксперты в соответствующих областях для оказания
                целенаправленной помощи и лечения.
              </p>
            </div>
            <div className="service">
              <h2>Диагностические услуги</h2>
              <p>
                Современные диагностические услуги, включая лабораторные
                анализы, изображение и передовые диагностические процедуры для
                точного и своевременного выявления заболеваний.
              </p>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="decorative-line"></div>
          <div className="footer-info">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p>
                <i className="fas fa-envelope"></i>Email: info@aegleclinic.com
              </p>
              <p>
                <i className="fas fa-phone"></i>Phone: +1 123-456-7890
              </p>
            </div>
            <div className="social-media">
              <h3>Follow Us</h3>
              <p>
                <i className="fab fa-facebook"></i>Facebook |
                <i className="fab fa-twitter"></i>Twitter |
                <i className="fab fa-instagram"></i>Instagram
              </p>
            </div>
          </div>
          <div className="decorative-line"></div>
          <p>&copy; 2023 Aegle Polyclinic. All rights reserved.</p>
          <p>Designed with ❤️ by Aegle Team</p>
        </div>
      </div>
    </div>
  );
}
