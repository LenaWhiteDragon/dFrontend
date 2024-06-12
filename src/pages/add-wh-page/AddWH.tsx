import { useState } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./AddWH.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import axios from "axios";

export const AddWH = () => {
  const [WHname, setWHname] = useState("");
  const [WHaddress, setWHaddress] = useState("");

  function AddWhFront() {
    axios
      .post(
        "http://localhost:5000/wh/addWh",
        {
          name: WHname,
          address: WHaddress,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Склад создан!");
        setWHname("");
        setWHaddress("");
      })
      .catch((error) => {
        console.error("There was an error adding the warehouse!", error);
      });
  }

  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className={styles.AddWHContainer}>
          <h1 className={styles.title}>Создание склада</h1>
          <input
            className={styles.fieldName}
            type="text"
            placeholder="Введите название склада"
            value={WHname}
            onChange={(e) => setWHname(e.target.value)}
          />
          <input
            className={styles.fieldAddress}
            type="text"
            placeholder="Введите адрес склада"
            value={WHaddress}
            onChange={(e) => setWHaddress(e.target.value)}
          />
          <button onClick={AddWhFront}>Добавить</button>
        </div>
      </PageContainer>
    </div>
  );
};
