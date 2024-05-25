import React, { useState } from "react";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { authStorage, signIn } from "../../auth/authStorage";
import { useDirty } from "../../hooks/useDirty";
import { BlobOptions } from "buffer";

function getEmailError(email: string) {
  if (email == "") return "Email не должен быть пустым.";
  return null;
}

function getPassError(password: string) {
  if (password == "") return "Пароль обязателен.";
  if (password.length < 4) return "Пароль должен быть не менее 4 символов.";
  return null;
}

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const [isButtonClicked, setisButtonClicked] = useState(false);
  const emailErrorMessage = getEmailError(email);
  const passErrorMessage = getPassError(password);

  //const emailErrorMessage = isButtonClicked ? emailError : null;
  //const passErrorMessage = isButtonClicked ? passError : null;
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  async function logIn() {
    setisButtonClicked(true);
    if (emailErrorMessage || passErrorMessage) {
      return;
    }
    if (!email || !password) {
      alert("не заполнены поля");
      return;
    }
    // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
    //   email: email,
    //   password: password
    // }))
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status == 401) {
      setServerErrorMessage("Ошибка данных");
      return;
    }
    if (response.ok) {
      const data = await response.json();
      alert("Регистрация прошла успешно!");
      signIn({
        token: data.token,
        roleId: data.user.role_id,
        userId: data.user.user_id,
      });
      //alert(authStorage.token);
      //alert(data.user.name);
    }
    //navigate(props.pathToRedirect);
  }
  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.card}>
          <span className={styles["card-title"]}>Создать аккаунт</span>
          <div className={styles["red-text"]}>{serverErrorMessage}</div>
          <div className={styles["card-content"]}>
            <div className={styles["input-field"]}>
              <label htmlFor="email">
                Email: <span className={styles["red-text"]}>*</span>
              </label>
              <input
                name="email"
                id="email"
                type="email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                  setServerErrorMessage("");
                }}
              />
              <span className={styles["red-text"]}>{emailErrorMessage}</span>
            </div>
            <div className={styles["input-field"]}>
              <label htmlFor="password">
                Пароль: <span className={styles["red-text"]}>*</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                onChange={(event) => {
                  setPass(event.target.value);
                  setServerErrorMessage("");
                }}
              />
              <span className={styles["red-text"]}>{passErrorMessage}</span>
            </div>
            <div className={styles["card-action"]}>
              <button
                onClick={logIn}
                className={styles["modal-action btn waves-effect"]}
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
