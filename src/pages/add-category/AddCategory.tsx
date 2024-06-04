import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./AddCategory.module.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import axios from "axios";
import { CategoryAttribute } from "../../types/Attribute";

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [newAttName, setNewAttName] = useState("");
  const [newAttType, setNewAttType] = useState<"integer" | "real" | "boolean">(
    "boolean"
  );
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
  function AddNewAtt() {
    axios
      .post("http://localhost:5000/category/addNewAtt", {
        name: newAttName,
        type: newAttType,
      })
      .then((response) => {
        console.log(response.data);
        alert("Характеристика создана!");
        setAttrs([...attrs, ...response.data]);
        setNewAttName("");
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

        <div className={styles.AddCategoryContainer}>
          <h4 className={styles.Title}>
            <i>Или сначала добавьте новую характеристику</i>
          </h4>
          <h2 className={styles.Title}>Создание характеристики</h2>
          <input
            className={styles.fieldName}
            type="text"
            placeholder="Введите название характеристики"
            value={newAttName}
            onChange={(e) => setNewAttName(e.target.value)}
          />
          <p>
            К характеристикам относятся:{" "}
            <i>мощность, скорость, RAM, bluetooth-подключение и т.д.</i>
          </p>

          <h3>И выберите тип:</h3>
          <div>
            <input
              type="radio"
              id="typeChoice1"
              value="boolean"
              checked={newAttType === "boolean"}
              onChange={() => setNewAttType("boolean")}
            />
            <label htmlFor="typeChoice1">Логическое да/нет</label>

            <input
              type="radio"
              id="typeChoice2"
              value="integer"
              checked={newAttType === "integer"}
              onChange={() => setNewAttType("integer")}
            />
            <label htmlFor="typeChoice2">Целое число</label>

            <input
              type="radio"
              id="typeChoice3"
              value="real"
              checked={newAttType === "real"}
              onChange={() => setNewAttType("real")}
            />
            <label htmlFor="typeChoice3">Число с запятой</label>
          </div>
          <button onClick={AddNewAtt}>Добавить</button>
        </div>
      </PageContainer>
    </div>
  );
};
