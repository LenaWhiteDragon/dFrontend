import { useNavigate } from "react-router-dom";
import "./AdminCreateClinic.scss";
import { useState } from "react";
import { UploadAndDisplayImage } from "../../../../components/UploadAndDisplayImage";
import { useDirty } from "../../../../hooks/useDirty";

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

function getNameError(name: string, isDirty: boolean) {
  if (isDirty && !name)
    return "Поле обязательно для заполнения.";
  return null;
}

function getPhoneError(phone: string, isDirty: boolean) {
  if (!phone) return null;
  if (/^\+?\d{10,15}$/.test(phone)) 
  return null;
  return "Неверный формат";
}

function getAddressError(address: string, isDirty: boolean) {
  if (isDirty && !address)
  return "Поле обязательно для заполнения.";
return null;
}

export function AdminCreateClinic() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName, isNameDirty] = useDirty("");
  const [address, setAddress, isAddressDirty] = useDirty("");
  const [phone, setPhone, isPhoneDirty] = useDirty("");
  const [photoFile, setPhotoFile] = useState<null | File>(null);

  const [isButtonClicked, setisButtonClicked] = useState(false);

  const emailErrorMessage = getEmailError(email);
  const passErrorMessage = getPassError(password);
  const nameErrorMessage = getNameError(name, isNameDirty);
  const addressErrorMessage = getAddressError(address, isAddressDirty);
  const phoneErrorMessage = getPhoneError(phone, isPhoneDirty);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  

    async function addClinic() {
      setisButtonClicked(true);
      if (emailErrorMessage || passErrorMessage || nameErrorMessage || addressErrorMessage || phoneErrorMessage) {
        return;
      }
      if (!email || !password || !name|| !address || !phone) {
        alert("не заполнены поля")
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch('http://localhost:5000/admin/addClinic', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          address: address,
          phone: phone
        }),
      })

      if (response.ok) {
        alert("Поликлиника успешно добавлена!");
      }

      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      const data = await response.json();
     // alert(JSON.stringify(data));
      // надо еще очистить все поля 
      
    }
    return (
<div>
<div className="card">
    <div className="card-content">
      <span className="card-title">Добавить Поликлинику</span>
  
      <div className="input-field">
        <label htmlFor="firstName">Название: <span  className={"red-text"}>*</span></label>
        <input id="firstName" type="text" 
        onChange={event => { setName(event.target.value); setServerErrorMessage("") }} />
        <span className="helper-text red-text">
          {nameErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="lastName">Адрес: <span  className={"red-text"}>*</span></label>
        <input id="lastName" type="text" 
        onChange={event => { setAddress(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
         {addressErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="middleName">Телефон: <span  className={"red-text"}>*</span></label>
        <input id="middleName" type="text"
        onChange={event => { setPhone(event.target.value); setServerErrorMessage("") }} />
        <span className="helper-text red-text">
            {phoneErrorMessage}
          </span>
      </div>

      <div className="input-field">
        <label htmlFor="email">Логин: <span  className={"red-text"}>*</span></label>
        <input autoComplete="one-time-code"  id="email" type="email" 
        onChange={event => { setEmail(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
          {emailErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="password">Пароль: <span  className={"red-text"}>*</span></label>
        <input  autoComplete="one-time-code" id="password" type="password" 
        onChange={event => { setPass(event.target.value); setServerErrorMessage("") }}/>
        <span className="helper-text red-text">
          {passErrorMessage}
        </span>
      </div>
    </div>
  
    <div className="card-action">
      <button  onClick={addClinic}  className="btn">Добавить</button>
    </div>

    <UploadAndDisplayImage onImageChange={setPhotoFile}/>

    {/* <div className="file-upload">
    <input type="file" accept=".xlsx, .xls" />
    <button>Загрузить Excel</button>
  </div> */}

  </div>

</div>

    )
}