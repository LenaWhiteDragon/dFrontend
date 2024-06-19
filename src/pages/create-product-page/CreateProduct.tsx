import { Header } from "../../components/Header/Header";
import styles from "./CreateProduct.module.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { CategoryAttribute, ProductAttribute } from "../../types/Attribute";
import axios from "axios";
import { removeLeadingZeros } from "../../tools/removeLeadingZeros";

interface GetCategoryAttsResponse {
  atts: ProductAttribute[];
}

export const CreateProduct = () => {
  const [productName, setproductName] = useState("");
  const [productImage, setproductImage] = useState("");
  const [categorySelectValue, setCategorySelectValue] = useState<string>("1");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productAttrs, setProductAttrs] = useState<ProductAttribute[]>([]);

  const isButtonDisabled =
    productName === "" || categories.length === 0 || productAttrs.length === 0;

  function AddNewProduct() {
    axios
      .post(
        "http://localhost:5000/product/createProduct",
        {
          name: productName,
          id_category: categorySelectValue,
          atts_of_products: JSON.stringify(
            productAttrs.map((att) => ({
              [att.id]: att.value,
            }))
          ),
          photo: productImage,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Продукт создан");
      })
      .catch((error) => {
        console.error("There was an error adding the category!", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axios.get(`http://localhost:5000/category`);
      setCategories(response.data);
    } catch (err) {
      setCategories([]);
    }
  }

  useEffect(() => {
    getAttrsByCategory(categorySelectValue);
  }, [categorySelectValue]);

  async function getAttrsByCategory(category: string) {
    try {
      if (category !== "all") {
        const response = await axios.get<GetCategoryAttsResponse>(
          `http://localhost:5000/category/getCategoriesAtts/${category}`
        );
        setProductAttrs(
          response.data.atts.map((att) => ({
            ...att,
            value: att.type === "boolean" ? false : 0,
          }))
        );
      } else {
        setProductAttrs([]);
      }
    } catch (err) {
      setProductAttrs([]);
    }
  }

  const handleBooleanChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductAttrs((prevAttrs) =>
        prevAttrs.map((attr) =>
          attr.id === id ? { ...attr, value: e.target.checked } : attr
        )
      );
    };

  const handleNumberChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductAttrs((prevAttrs) =>
        prevAttrs.map((attr) =>
          attr.id === id ? { ...attr, value: Number(e.target.value) } : attr
        )
      );
    };

  return (
    <div>
      <Header />
      <PageContainer>
        <NavBar />
        <div className={styles.CreateProductContainer}>
          <h1>Создать оборудование</h1>
          <p>
            На этой странице вы создаёте <i>новое</i> оборудование. Если у вас
            поставка уже существующего оборудования, вам нужна страница
            конкретного оборудования.
          </p>
          <input
            className={styles.fieldName}
            type="text"
            placeholder="Введите название продукта"
            value={productName}
            onChange={(e) => setproductName(e.target.value)}
          />
          <div className={styles.filterMenu}>
            <select
              className={styles.select}
              name="Category"
              id="Category"
              value={categorySelectValue}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategorySelectValue(e.target.value);
              }}
            >
              {categories.map((category: Category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            className={styles.fieldName}
            type="text"
            placeholder="Введите ссылку на изображение"
            value={productImage}
            onChange={(e) => setproductImage(e.target.value)}
          />
          {productAttrs.map((att) => {
            return att.type === "boolean" ? (
              <div className={styles.inputContainer} key={att.id}>
                <input
                  type="checkbox"
                  className={styles.attrInput}
                  name={att.id.toString()}
                  id={att.id.toString()}
                  checked={att.value as boolean}
                  onChange={handleBooleanChange(att.id)}
                />
                <label htmlFor={att.id.toString()}>{att.name}</label>
              </div>
            ) : (
              <div className={styles.inputContainer} key={att.id}>
                <input
                  type="number"
                  className={styles.attrInput}
                  name={att.id.toString()}
                  id={att.id.toString()}
                  value={removeLeadingZeros(att.value.toString())} // Вызываем removeLeadingZeros здесь
                  onChange={(e) => handleNumberChange(att.id)(e)}
                />
                <label htmlFor={att.id.toString()}>{att.name}</label>
              </div>
            );
          })}
          <button onClick={AddNewProduct} disabled={isButtonDisabled}>
            Создать
          </button>
        </div>
      </PageContainer>
    </div>
  );
};
