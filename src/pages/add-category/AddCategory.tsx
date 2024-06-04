import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./AddCategory.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import axios from "axios";
import { CategoryAttribute } from "../../types/Attribute";

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [attrs, setAttrs] = useState<CategoryAttribute[]>([]);
  const [changeAtts, setChangeAtts] = useState<number[]>([]);

  function AddCategoryFront() {
    axios
      .post(
        "http://localhost:5000/category/addCategory",
        { name: categoryName, id_atts: JSON.stringify(changeAtts) },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Категория создана!");
        setCategoryName("");
        setChangeAtts([]);
      })
      .catch((error) => {
        console.error("There was an error adding the category!", error);
      });
  }

  useEffect(() => {
    getAllAttrs();
  }, []);

  async function getAllAttrs() {
    try {
      const response = await axios.get<CategoryAttribute[]>(
        `http://localhost:5000/category/getAttsList`
      );
      setAttrs(response.data);
    } catch (err) {
      setAttrs([]);
    }
  }

  const handleCheckboxChange = (id: number) => {
    setChangeAtts((prevChangeAtts) =>
      prevChangeAtts.includes(id)
        ? prevChangeAtts.filter((attId) => attId !== id)
        : [...prevChangeAtts, id]
    );
  };

  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className={styles.AddCategoryContainer}>
          <h1 className={styles.Title}>Создание категории</h1>
          <input
            className={styles.fieldName}
            type="text"
            placeholder="Введите название категории"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <p>
            К категориям относится тип товара:{" "}
            <i>компьютер, монитор, мышь и т.д.</i>
          </p>

          <h3>Выберите характеристики, которые должны быть у категории</h3>
          <div className={styles.OldAtts}>
            {attrs.map((attr) => (
              <div>
                <input
                  type="checkbox"
                  id={attr.id.toString()}
                  checked={changeAtts.includes(attr.id)}
                  onChange={() => handleCheckboxChange(attr.id)}
                />
                <label key={attr.id} htmlFor={attr.id.toString()}>
                  {attr.name}
                </label>
              </div>
            ))}
          </div>

          <button onClick={AddCategoryFront}>Добавить</button>
        </div>
      </PageContainer>
    </div>
  );
};
