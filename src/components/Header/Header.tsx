import "./Header.scss";

import { Outlet, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { Register } from "../../pages/register/Register";
import { CloseModal } from "../../features/close-modal/close-modal";
import { useEffect } from "react";
import { authStorage, signOut } from "../../auth/authStorage";

export const Header = () => {
  const navigate = useNavigate();
  const loginModal = useModal();
  const closeConfirmModal = useModal();
  const registerModal = useModal();

  useEffect(() => {
    if (authStorage.roleId != "1" && !!authStorage.roleId) {
      signOut();
      window.location.href = "/";
    }
  }, []);

  function openRegister() {
    loginModal.closeModal();
    registerModal.openModal(loginModal.pathToRedirect);
    return;
  }

  return (
    <nav>
      <div className="nav-wrapper grey darken-1">
        <a onClick={() => navigate("/")} className="brand-logo">
          Aegle
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {/* <li><a onClick={() => { navigate("/login") }}>Вход</a></li>
      <li><a onClick={() => { navigate("/register") }}>Регистрация</a></li> */}

          {/* <button disabled={true} onClick={() => openModal("/")}>Вход</button> */}
          {/* className={`${authStorage.token == "" ? "" : "disabledLink"}`} */}
          <li>
            {authStorage.token == "" ? (
              <a onClick={() => navigate("/Login")}>Вход</a>
            ) : (
              <a onClick={() => closeConfirmModal.openModal("/")}>Выход</a>
            )}
          </li>
        </ul>
      </div>
      <Outlet context={{ openLoginModal: loginModal.openModal }} />
      <CloseModal
        isOpen={closeConfirmModal.isOpen}
        closeModal={closeConfirmModal.closeModal}
      />
    </nav>
  );
};
