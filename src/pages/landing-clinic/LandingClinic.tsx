import React, { ReactNode, useEffect, useState } from 'react';
import logo from './logo.svg';
import './LandingClinic.scss';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { authStorage } from '../../authStorage';
import useModal from '../../hooks/useModal';
import { CloseModal } from '../../features/close-modal/close-modal';
import { LoginModal } from '../../features/login-modal/login-modal';
import { RegisterModal } from '../../features/register-modal/register-modal';
import { isPropertySignature } from 'typescript';
import { useDirty } from '../../hooks/useDirty';

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

interface Blog {
  header: string,
  text: string
}

export function LandingClinic() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginModal = useModal();
  const registerModal = useModal();
  const closeConfirmModal = useModal();
  const { clinicId } = useParams();
  const [blogs, setBlogs] = useState<Blog[]>([])

  function openRegister() {
    loginModal.closeModal();
    registerModal.openModal(loginModal.pathToRedirect);
    return
  }

  const [name, setName, isNameDirty] = useDirty("");
  const [address, setAddress, isAddressDirty] = useDirty("");
  const [phone, setPhone, isPhoneDirty] = useDirty("");
  const [workHours, setWorkHours, isWorkHoursDirty] = useDirty("");
  const [photoFile, setPhotoFile] = useState<null | File>(null);

  const [isButtonClicked, setisButtonClicked] = useState(false);

  // const nameErrorMessage = getNameError(name, isNameDirty);
  // const addressErrorMessage = getAddressError(address, isAddressDirty);
  // const phoneErrorMessage = getPhoneError(phone, isPhoneDirty);
  // const hoursErrorMessage = getWorkHoursError(workHours, isWorkHoursDirty);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  //const [timeRanges, setTimeRanges] = useState<BlogPost[]>(timeRangesInitialValue);



  async function fetchBlogs(filter = clinicId) {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinicsPublic/getBlogs/?id=' + filter, {
    })

    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404) {
      setServerErrorMessage("Блоки не найдены");
      setBlogs([]);
      return;
    }
    else {
      setBlogs(data);
      setServerErrorMessage("");
    }
  }


  async function fetchClinic(filter = clinicId) {
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch('http://localhost:5000/clinicsPublic/getClinicByIdLanding/?id=' + filter, {
    })

    const data = await response.json();
    //alert(JSON.stringify(data));
    if (response.status == 404) {
      setServerErrorMessage("Врачи не найдены");
      // setDoctor(null);
      return;
    }
    else {
      //   setDoctor(data);
      setServerErrorMessage("");
      setName(data.title)
      setPhone(data.phone)
      setAddress(data.address)
      setWorkHours(data.work_hours)
      //alert(doctor?.name.split(" ", 3))

    }
  }
  //const type = "clinic"
  const type1 = "clinicService"
  const type2 = "clinicDoctor"

  async function bookService() {
    if (authStorage.token == "") {
             const stringToGo: string = "/orderProduct/" + type1 + "/" + clinicId
            loginModal.openModal(stringToGo) //после авторизации идем на продолжение записи
        }
        else 
        {
            navigate("/orderProduct/" + type1 + "/" + clinicId) //сразу переходим на страницу записи
    }
  }

  async function bookDoctor() {
    if (authStorage.token == "") {
             const stringToGo: string = "/orderProduct/" + type2 + "/" + clinicId
            loginModal.openModal(stringToGo) //после авторизации идем на продолжение записи
        }
        else 
        {
            navigate("/orderProduct/" + type2 + "/" + clinicId) //сразу переходим на страницу записи
    }
  }

  useEffect(() => {
    // alert(debouncedValue)
    fetchClinic(); fetchBlogs()
  }, [])

  return (
    <div>
      <nav>
        <div className="nav-wrapper grey darken-1">
          {authStorage.token == "" || authStorage.roleId == "1" ? (
            <a onClick={() => navigate("/")} className="brand-logo">Aegle</a>
          ) : (<a className="brand-logo">Aegle</a>)}

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><a onClick={() => { navigate("/login") }}>Вход</a></li>
            <li><a onClick={() => { navigate("/register") }}>Регистрация</a></li> */}

            {/* <button disabled={true} onClick={() => openModal("/")}>Вход</button> */}
            {/* className={`${authStorage.token == "" ? "" : "disabledLink"}`} */}
            <li>
              {authStorage.token == "" ? (
                <a onClick={() => loginModal.openModal(location.pathname)}>
                  Вход
                </a>
              ) : (authStorage.roleId == "1") ? (<a onClick={() => closeConfirmModal.openModal(location.pathname)}>
                Выход
              </a>) : (""
              )}

              {/* 
              {authStorage.token == "" || authStorage.token == "1" ? (
                <a onClick={() => loginModal.openModal(location.pathname)}>
                  Вход
                </a>
              ) : (
                <a onClick={() => closeConfirmModal.openModal(location.pathname)}>
                  Выход
                </a>
              )} */}

            </li>
          </ul>
        </div>
      </nav>
      <div className="auth-block">
        <div className="landing-container">
          {/* <div>{clinicId}</div> */}
          <div className='container'>
            <img src={"http://localhost:5000/clinicsPublic/clinicImage?id=" + clinicId} alt="Логотип поликлиники" className="logo" />
            <div className="clinic-name">{name}</div>
            <div className="info">Адрес: {address}</div>
            <div className="info">Телефон: {phone}</div>
            <div className="info">Часы работы: {workHours}</div>
            {authStorage.token == "" || authStorage.roleId == "1" ? (
              <div className="book-buttons">
                <button onClick={bookDoctor}>Записаться к врачу</button>
                <button onClick={bookService}>Записаться на услугу</button>
              </div>
          ) : (""
          )}
            <div className="info-block">
              <div className="services-container">
                {blogs.map(blogs => {
                  return (
                    <div className="service">
                      <h2>{blogs.header}</h2>
                      <p>
                        {blogs.text}
                      </p>
                    </div>
                  )
                })}
                {/* вытаскиваем массив и распределяем по карточкам */}
                {/* <div className="service">
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
                Специализированные клиники по различным медицинским состояниям, где
                работают эксперты в соответствующих областях для оказания
                целенаправленной помощи и лечения.
              </p>
            </div>
            <div className="service">
              <h2>Диагностические услуги</h2>
              <p>
                Современные диагностические услуги, включая лабораторные анализы,
                изображение и передовые диагностические процедуры для точного и
                своевременного выявления заболеваний.
              </p>
            </div> */}
              </div>
            </div>
          </div>













          {/* <div>  {authStorage.token}</div>
          <h1>Welcome to Aegle Polyclinic</h1>
          <p>Ваш надежный партнер в сфере здравоохранения</p>
          <div>
            {authStorage.token == "" ?
              <div></div> :
              <div>
                <p>Вы вошли в систему!</p>
                <a className='lka' onClick={() => navigate("/myadmin")}>&gt;&gt;&gt;В ЛИЧНЫЙ КАБИНЕТ&lt;&lt;&lt;</a>
              </div>}
          </div>
          {/*пока что временная вещь, здесь только будет переход на лк пациента
          
        <img myadmin myclinic
            className="clinic-image"
            src="http://klublady.ru/uploads/posts/2022-07/thumbs/1658582446_18-klublady-ru-p-posokh-asklepiya-tatu-eskiz-foto-18.jpg"
            alt="Clinic Image"
          /> 
          <div className="search-tabs">
            <button className={`tab ${location.pathname == "/clinics" ? "active" : ""}`}
              onClick={() => { navigate("/clinics") }}>По поликлиникам</button>
            <button className={`tab ${location.pathname == "/doctors" ? "active" : ""}`} onClick={() => { navigate("/doctors") }}>По врачам</button>
            <button className={`tab ${location.pathname == "/services" ? "active" : ""}`} onClick={() => { navigate("/services") }}>По услугам</button>
          </div> */}
  

          {/* <Outlet context={{ openLoginModal: loginModal.openModal }} /> */}
          <div>
            <LoginModal isOpen={loginModal.isOpen} closeModal={loginModal.closeModal}
              pathToRedirect={loginModal.pathToRedirect} openRegister={openRegister} />

            <RegisterModal isOpen={registerModal.isOpen} closeModal={registerModal.closeModal}
              pathToRedirect={registerModal.pathToRedirect} />

            <CloseModal isOpen={closeConfirmModal.isOpen} closeModal={closeConfirmModal.closeModal} />
          </div>
          {/* <p>
            Мы предлагаем широкий спектр медицинских услуг для обеспечения вашего
            благополучия. Наша команда опытных врачей и персонала стремится
            предоставить высококачественную помощь в комфортных условиях.
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
                Специализированные клиники по различным медицинским состояниям, где
                работают эксперты в соответствующих областях для оказания
                целенаправленной помощи и лечения.
              </p>
            </div>
            <div className="service">
              <h2>Диагностические услуги</h2>
              <p>
                Современные диагностические услуги, включая лабораторные анализы,
                изображение и передовые диагностические процедуры для точного и
                своевременного выявления заболеваний.
              </p>
            </div>
          </div> */}
        </div>
        <div className="footer">
          <div className="decorative-line"></div>
          <div className="footer-info">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <p><i className="fas fa-envelope"></i>Email: info@aegleclinic.com</p>
              <p><i className="fas fa-phone"></i>Phone: +1 123-456-7890</p>
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
