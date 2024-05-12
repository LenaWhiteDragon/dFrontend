import React, { useState } from 'react';
import styles from './delete-modal.module.scss'
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { authStorage } from '../../authStorage';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  item: string;
  onConfirm: () => void;
  //pathToRedirect : string;
  //openRegister: () => void;
}

export function DeleteModal(props: Props) {
  const navigate = useNavigate();
  async function logOut() {
    props.onConfirm();
  //  props.IsConfirmed = (true); 
    props.closeModal();
  }

  return (
    <Modal isOpen={props.isOpen}>
      <div className={styles.overlay}>
        <div className={styles.card}>
          <span className={styles["card-title"]}>Вы уверены?</span>
          <div className={styles["card-content"]}>
          <label>Вы точно хотите удалить {props.item} ?</label>
          <button className={styles["btn"]} mat-button onClick={logOut}>
              Удалить
            </button>
            <button  className={styles["btn"]} onClick={props.closeModal} mat-button>
              Отмена
            </button>
          </div>
          <div className={styles["card-action"]}>
          </div>
        </div>
      </div>
    </Modal>
  )
}
