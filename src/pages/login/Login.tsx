import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { authStorage, signIn } from "../../authStorage";


  function getEmailError(email: string) {
    if (email == "") return "Email не должен быть пустым.";
    return null;
  }

  function getPassError(password: string) {
    if (password == "") return "Пароль обязателен.";
    if (password.length < 4) return "Пароль должен быть не менее 4 символов.";
    return null;
  }

  export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const [isButtonClicked, setisButtonClicked] = useState(false);
    const emailError = getEmailError(email);
    const passError = getPassError(password);
    const emailErrorMessage = isButtonClicked ? emailError : null;
    const passErrorMessage = isButtonClicked ? passError : null;
    const [serverErrorMessage, setServerErrorMessage] = useState("");

    async function logIn() {
      setisButtonClicked(true);
      if (emailError || passError) {
        return;
      }
      // const response = await request.post('http://localhost:5000/auth/login').send(JSON.stringify({
      //   email: email,
      //   password: password
      // }))
      const response = await fetch("http://localhost:5000/auth/login", {
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
      const data = await response.json();
      //alert(JSON.stringify(data));
      // authStorage.token = data.token;
      // authStorage.roleId = data.user.role_id;
      // authStorage.userId = data.user.user_id;
      signIn({
        token: data.token,
        roleId: data.user.role_id,
        userId: data.user.user_id,
      });
      navigate("/")
    }

    return (
      <div>
        <div className={styles.overlay}>
          <div className={styles.card}>
            <span className={styles["card-title"]}>Войти в систему</span>
            <span className={styles["red-text"]}>{serverErrorMessage}</span>
            <div className={styles["red-text"]}></div>

            <div className={styles["card-content"]}>
              <div className={styles["input-field"]}>
                <label htmlFor="email">Email:</label>
                <input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setServerErrorMessage("");
                  }}
                  name="email"
                  id="email"
                  type="email"
                  required
                />
                <span className={styles["red-text"]}>{emailErrorMessage}</span>
              </div>
              <div className={styles["input-field"]}>
                <label htmlFor="password">Пароль:</label>
                <input
                  value={password}
                  onChange={(event) => {
                    setPass(event.target.value);
                    setServerErrorMessage("");
                  }}
                  name="password"
                  id="password"
                  type="password"
                />
                <span className={styles["red-text"]}>{passErrorMessage}</span>
              </div>
            </div>
            <div className={styles["card-action"]}>
              <button
                onClick={logIn}
                // disabled={!!emailError||!!passError}
                type="submit"
                // className="modal-action btn waves-effect"
              >
                Войти
              </button>
              <a
                onClick={() => navigate("/Register")}
                className={styles.regLink}
              >
                Пройдите быструю регистрацию сейчас!
              </a>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
