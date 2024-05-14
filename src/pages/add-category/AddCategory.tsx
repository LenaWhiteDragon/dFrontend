import { useState } from "react";
import { Header } from "../../components/Header/Header";
import "./AddCategory.css";

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  function AddCategoryFront() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName}),
    };
    fetch("http://localhost:5000/category/addCategory", requestOptions).then((response) =>
      response.json()
    );
  }

  return (
    <div>
      <Header />
      <div className="AddCategoryContainer">
        <h1 className="Title">Добавление категории</h1>
        <input
          className="fieldName"
          type="text"
          placeholder="Введите название категории"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <p>К категориям относится тип товара: <i>компьютер, монитор, мышь и т.д.</i></p>
        <button onClick={AddCategoryFront}>Добавить</button>
      </div>
    </div>
  );
};
