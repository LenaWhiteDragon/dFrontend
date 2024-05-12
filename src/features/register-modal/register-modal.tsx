import React, { useState } from 'react';
import styles from './register-modal.module.scss';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { authStorage, signIn } from '../../authStorage';
import { useDirty } from '../../hooks/useDirty';
import { BlobOptions } from 'buffer';

function getEmailError(email: string) {
  if (email == "")
    return "Email не должен быть пустым.";
  return null;
}

function getPassError(password: string) {
  if (password == "")
    return "Пароль обязателен.";
  if (password.length < 4)
    return "Пароль должен быть не менее 4 символов.";
  return null;
}
function getFamError(fam: string, isDirty: boolean) {
  if (isDirty && !fam)
  {
    return "Поле обязательно для заполнения.";
  }
  return null;
}

function getNameError(name: string, isDirty: boolean) {
  if (isDirty && !name)
    return "Поле обязательно для заполнения.";
  return null;
}
function getOtchError(otch: string, isDirty: boolean) {
  if (isDirty && !otch)
    return "Поле обязательно для заполнения.";
  return null;
}

function getBirthError(birth: string) {
  var currentTime = new Date(); 
 // alert(currentTime.toUTCString)
 // alert(birth)
  if (birth > currentTime.toString())
    return "Назад в будущее";
  return null;
} 

function getPhoneError(phone: string, isDirty: boolean) {
  if (!phone) return null;
  if (/^\+?\d{10,15}$/.test(phone)) 
  return null;
  return "Неверный формат";
}

function getAddressError(address: string, isDirty: boolean) {
  if (!address) return null;
}

function getSNILSError(SNILS: string, isDirty: boolean) {
  if (!SNILS) return null
  if (/\d{3}-\d{3}-\d{3} \d{2}/.test(SNILS)) // true)
  return null;
  return "Введите СНИЛС в формате XXX-XXX-XXX XX";
}
interface Props {
  isOpen: boolean;
  closeModal: () => void;
  pathToRedirect: string;
}

export function RegisterModal(props: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fam, setFam, isFamDirty] = useDirty(""); // dirty для того чтобы отслеживать модиф ли пользватель
  const [name, setName, isNameDirty] = useDirty("");
  const [otch, setOtch, isOtchDirty] = useDirty("");
  const [birth, setBirth] = useState<string>("");
  const [phone, setPhone, isPhoneDirty]= useDirty("");
  const [address, setAddress, isAddressDirty]= useDirty("");
  const [SNILS, setSNILS, isSNILSDirty]= useDirty("");



  const [isButtonClicked, setisButtonClicked] = useState(false);
  const emailErrorMessage = getEmailError(email);
  const passErrorMessage = getPassError(password);
  const famErrorMessage = getFamError(fam, isFamDirty); //добавляем isDirty как параметр функции 
  const nameErrorMessage = getNameError(name, isNameDirty);
  const otchErrorMessage = getOtchError(otch, isOtchDirty);
  const birthErrorMessage = getBirthError(birth);
  const phoneErrorMessage = getPhoneError(phone, isPhoneDirty);
  const addressErrorMessage = getAddressError(address, isAddressDirty);
  const SNILSErrorMessage = getSNILSError(SNILS, isSNILSDirty);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  
    async function logIn() {
      setisButtonClicked(true);
      if (emailErrorMessage || passErrorMessage || famErrorMessage || nameErrorMessage || otchErrorMessage || phoneErrorMessage || birthErrorMessage || addressErrorMessage || SNILSErrorMessage) {
        return;
      }
      if (!email || !password || !fam || !name|| !otch) {
        alert("не заполнены поля")
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fam: fam,
          name: name,
          otch: otch,
          birth: birth,
          phone: phone,
          address: address,
          SNILS: SNILS
        }),
      })

      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      if (response.ok) 
        {
          const data = await response.json();
          alert("Регистрация прошла успешно!");
          signIn({token: data.token, roleId: data.user.role_id, userId: data.user.user_id});
           //alert(authStorage.token);
          //alert(data.user.name);
          navigate(props.pathToRedirect);
        }
      //navigate(props.pathToRedirect);

      props.closeModal();
    }
    return (
      <Modal isOpen={props.isOpen}>
        <div className={styles.overlay}>
          <div className={styles.card}>
            <span className={styles["card-title"]}>Создать аккаунт</span>
            <div className={styles["red-text"]}>{serverErrorMessage}</div>

            <a className={styles["brand-logo"]} onClick={props.closeModal}>&#x2717;</a>
            <div className={styles["card-content"]}>
              <div className={styles["input-field"]}>
                <label htmlFor="email">Email: <span  className={styles["red-text"]}>*</span></label>
                <input name="email" id="email" type="email" required onChange={event => {
                  setEmail(event.target.value);
                  setServerErrorMessage("")
                }} />
                <span

                  className={styles["red-text"]}
                >
                  {emailErrorMessage}
                </span>

              </div>
              <div className={styles["input-field"]}>
                <label htmlFor="password">Пароль: <span  className={styles["red-text"]}>*</span></label>
                <input name="password" id="password" type="password" onChange={event => { setPass(event.target.value); setServerErrorMessage("") }} />
                <span

                  className={styles["red-text"]}
                >
                  {passErrorMessage}
                </span>
              </div>

              <div className={styles["input-field"]}>
                <label htmlFor="lastName">Ваша фамилия: <span  className={styles["red-text"]}>*</span></label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  required
                  onChange={event => { setFam(event.target.value); setServerErrorMessage("") }} />
                <span
                  className={styles["red-text"]}
                >
                  {famErrorMessage}
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="firstName">Ваше имя: <span  className={styles["red-text"]}>*</span></label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  required
                  onChange={event => { setName(event.target.value); setServerErrorMessage("") }}
                />
                <span
                  className={styles["red-text"]}
                >
                  {nameErrorMessage}
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="middleName">Ваше отчество: <span  className={styles["red-text"]}>*</span></label>
                <input
                  name="middleName"
                  id="middleName"
                  type="text"
                  required
                  onChange={event => { setOtch(event.target.value); setServerErrorMessage("") }}
                />
                <span
                  className={styles["red-text"]}
                >
                  {otchErrorMessage}
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="birthday">Дата рождения:</label>
                <input
                  name="birthday"
                  id="birthday"
                  type="date"
                  required
                  onChange={event => { console.log(event.target.value); setBirth(event.target.value); setServerErrorMessage("") }}
                />
                <span  
                  className={styles["red-text"]}
                >
                 {birthErrorMessage} 
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="phone">Номер телефона:</label>
                <input name="phone"
                  id="phone" type="tel"
                  required
                  onChange={event => { setPhone(event.target.value); setServerErrorMessage("") }} />
                <span
                  className={styles["red-text"]}>
                  {phoneErrorMessage}
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="address">Адрес:</label>
                <input name="address" id="address"
                  type="text" required
                  onChange={event => { setAddress(event.target.value); setServerErrorMessage("") }} />
                <span
                  className={styles["red-text"]}
                >
                  {addressErrorMessage}
                </span>
              </div>


              <div className={styles["input-field"]}>
                <label htmlFor="snils">СНИЛС:</label>
                <input
                  name="snils"
                  id="snils"
                  type="text"
                  required
                  pattern="\d{3}-\d{3}-\d{3} \d{2}"
                  onChange={event => { setSNILS(event.target.value); setServerErrorMessage("") }}
                />
                <span
                  className={styles["red-text"]}
                >
                  {SNILSErrorMessage}
                </span>
              </div>
              <div className={styles["card-action"]}>
                <button  onClick={logIn} className={styles["modal-action btn waves-effect"]}>
                  Создать
                </button>
              </div>
            </div>

          </div>
        </div>
      </Modal >

    );
  }

