import { useNavigate } from "react-router-dom";
import "./AdminCreate.scss";
import { useState } from "react";

export function AdminCreate() {

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

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  
  const emailErrorMessage = getEmailError(email);
  const passErrorMessage = getPassError(password);

  const [serverErrorMessage, setServerErrorMessage] = useState("");
  
    async function addAdmin() {
      if (emailErrorMessage || passErrorMessage) {
        return;
      }
      if (!email || !password) {
        alert("не заполнены поля")
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch('http://localhost:5000/admin/addAdmin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })

      if (response.status == 401) {
        setServerErrorMessage("Ошибка данных");
        return;
      }
      if (response.ok) {
        const data = await response.json();
        alert("Админ создан успешно!");
      }

      // надо еще очистить все поля 
    }

    return (
<div>
<div className="card">
    <div className="card-content">
      <span className="card-title">Добавить администратора</span>

      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input autoComplete="one-time-code" 
        onChange={event => { setEmail(event.target.value); setServerErrorMessage("") }} id="email" type="email" />
        <span className="helper-text red-text">
          {emailErrorMessage}
        </span>
      </div>
  
      <div className="input-field">
        <label htmlFor="password">Пароль:</label>
        <input  autoComplete="one-time-code"
        onChange={event => { setPass(event.target.value); setServerErrorMessage("") }} id="password" type="password" />
        <span className="helper-text red-text">
         {passErrorMessage}
        </span>
      </div>
    </div>
  
    <div className="card-action">
      <button onClick={addAdmin}  className="btn">Добавить</button>
    </div>
    {/* <div className="file-upload">
    <input type="file" accept=".xlsx, .xls" />
    <button>Загрузить Excel</button>
  </div> */}

  </div>

</div>

    )
}