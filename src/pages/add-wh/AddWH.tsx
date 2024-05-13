import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./AddWH.css";

export const AddWH = () => {
  const [WHname, setWHname] = useState("");
  const [WHaddress, setWHaddress] = useState("");

  function AddWhFront() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: WHname, address: WHaddress }),
    };
    fetch("http://localhost:5000/wh/addWh", requestOptions).then((response) =>
      response.json()
    );
  }

  return (
    <div>
      <Header />
      <div className="AddWHContainer">
        <h1 className="Title">Добавление склада</h1>
        <input
          className="fieldName"
          type="text"
          placeholder="Введите название склада"
          value={WHname}
          onChange={(e) => setWHname(e.target.value)}
        />
        <input
          className="fieldAddress"
          type="text"
          placeholder="Введите адрес склада"
          value={WHaddress}
          onChange={(e) => setWHaddress(e.target.value)}
        />
        <button onClick={AddWhFront}>Добавить</button>
      </div>
    </div>
  );
};
