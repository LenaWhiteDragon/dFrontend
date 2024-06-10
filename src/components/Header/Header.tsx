import styles from "./Header.module.scss";

import { Outlet, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { CloseModal } from "../../features/CloseModal/CloseModal";
import { useEffect } from "react";
import { authStorage, signOut } from "../../features/auth/authStorage";

export const Header = () => {
  const navigate = useNavigate();
  const loginModal = useModal();
  const closeConfirmModal = useModal();

  useEffect(() => {
    if (authStorage.roleId != "1" && !!authStorage.roleId) {
      signOut();
      window.location.href = "/";
    }
  }, []);

  return (
    <nav>
      <div className={styles.navWrapper}>
        <a onClick={() => navigate("/")} className={styles.logo}>
          Warehouse Heaven
        </a>
        {authStorage.token == "" ? (
          <a className={styles.loginButton} onClick={() => navigate("/Login")}>
            Вход
          </a>
        ) : (
          <a
            className={styles.loginButton}
            onClick={() => closeConfirmModal.openModal("/")}
          >
            Выход
          </a>
        )}
      </div>
      <Outlet context={{ openLoginModal: loginModal.openModal }} />
      <CloseModal
        isOpen={closeConfirmModal.isOpen}
        closeModal={closeConfirmModal.closeModal}
      />
    </nav>
  );
};
