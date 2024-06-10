import styles from "./CloseModal.module.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { authStorage, signOut } from "../auth/authStorage";
interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export function CloseModal(props: Props) {
  async function logOut() {
    signOut();
    window.location.href = "/";
    props.closeModal();
  }

  return (
    <Modal isOpen={props.isOpen}>
      <div className={styles.overlay}>
        <div className={styles.card}>
          <span className={styles["card-title"]}>Вы уверены?</span>
          <div className={styles["card-content"]}>
            <label>Вы точно хотите выйти из аккаунта?</label>
            <button className={styles["btn"]} mat-button onClick={logOut}>
              Выйти
            </button>
            <button
              className={styles["btn"]}
              onClick={props.closeModal}
              mat-button
            >
              Отмена
            </button>
          </div>
          <div className={styles["card-action"]}></div>
        </div>
      </div>
    </Modal>
  );
}
