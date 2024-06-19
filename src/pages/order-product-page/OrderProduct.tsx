import { Header } from "../../components/Header/Header";
import imagePlaceholder from "../../assets/images/image_placeholder.png";
import styles from "./OrderProduct.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";
import { WareHouse } from "../../types/WareHouse";
import { WareHouseOrder } from "./WareHouseOrder/WareHouseOrder";
import { WareHouseAddProduct } from "./WareHouseAddProduct/WareHouseAddProduct";
import { authStorage } from "../../features/auth/authStorage";
import { UserRole } from "../../types/UserRole";
import axios from "axios";

const SUPPLY_ROLES_AVAILABLE: UserRole[] = [
  UserRole.Whman,
  UserRole.Whboss,
  UserRole.Admin,
];
const ORDER_ROLES_AVAILABLE: UserRole[] = [
  UserRole.Operator,
  UserRole.Whboss,
  UserRole.Admin,
];

export const OrderProduct = () => {
  const [product, setProduct] = useState<Product>();
  const [orderAmount, setOrderAmount] = useState<number[]>([]);
  const [addProductAmount, setAddProductAmount] = useState<number[]>([]);
  const [warehouseList, setWarehouseList] = useState<WareHouse[]>([]);
  const { id } = useParams();
  const productAmount = product?.number.reduce(
    (acc, amount) => acc + amount,
    0
  );

  useEffect(() => {
    if (product) {
      setOrderAmount(product.number.map((el) => (el !== 0 ? 1 : 0)) || []);
      setAddProductAmount(product.number);
    }
  }, [product]);

  async function CreateSupply() {
    try {
      const response = await axios.put(
        "http://localhost:5000/product/setProduct",
        {
          id_product: product?.id,
          number: addProductAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Количество оборудования изменено");
      setProduct((prevProduct) => {
        if (prevProduct) {
          return { ...prevProduct, number: response.data.number };
        }
        return prevProduct;
      });
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  async function CreateOrder() {
    try {
      const response = await axios.put(
        "http://localhost:5000/product/orderProduct",
        {
          id_product: product?.id,
          number: orderAmount,
          id_user: authStorage.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Заказ выполнен");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  useEffect(() => {
    async function getProduct(): Promise<Product> {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/getProductById/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        setProduct(data);
        return data;
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        throw error;
      }
    }
    getProduct();
  }, []);

  useEffect(() => {
    async function getWarehouse(): Promise<WareHouse[]> {
      try {
        const response = await axios.get("http://localhost:5000/wh/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = response.data;
        setWarehouseList(data);
        return data;
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        throw error;
      }
    }
    getWarehouse();
  }, []);

  useEffect(() => {
    if (product && warehouseList.length !== 0) {
      if (warehouseList.length !== product.number.length) {
        const updatedNumbers = Array(warehouseList.length).fill(0);
        for (let i = 0; i < product.number.length; i++) {
          updatedNumbers[i] = product.number[i];
        }
        setProduct((prevProduct) => {
          if (prevProduct) {
            return { ...prevProduct, number: updatedNumbers };
          }
          return prevProduct;
        });
      }
    }
  }, [product, warehouseList]);

  return (
    <div>
      <Header />
      <div className={styles.orderProductContainer}>
        <div className={styles.productInfoContainer}>
          <img
            className={styles.productImage}
            src={product?.photo || imagePlaceholder}
          />
          <h2 className={styles.productTitle}>{product?.name}</h2>
          <ul className={styles.productCharsContainer}>
            {product?.atts.map((attr) => (
              <li>
                {attr.name}:{" "}
                {attr.var_integer ??
                  attr.var_real ??
                  (attr.var_boolean !== null &&
                  attr.var_boolean !== undefined &&
                  attr.var_boolean === true
                    ? "Да"
                    : "Нет")}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.productWHAmountContainer}>
          <h3>Всего в наличии: {productAmount}</h3>
        </div>
        {SUPPLY_ROLES_AVAILABLE.includes(Number(authStorage.roleId)) && (
          <>
            <div className={styles.whProductNumberContainer}>
              <h2>Добавить продукты на склады</h2>
              {warehouseList.map(
                (wh, index) =>
                  product !== undefined && (
                    <WareHouseAddProduct
                      warehouse={wh}
                      product={product}
                      addProductAmount={addProductAmount}
                      setAddProductAmount={setAddProductAmount}
                      index={index}
                    />
                  )
              )}
            </div>
            <button
              className={styles.buttonOrder}
              onClick={CreateSupply}
              style={{ marginBottom: 50 }}
            >
              Изменить количество
            </button>
          </>
        )}
        {ORDER_ROLES_AVAILABLE.includes(Number(authStorage.roleId)) && (
          <>
            <div className={styles.whProductNumberContainer}>
              <h2>Заказать продукты со складов</h2>
              {warehouseList.map(
                (wh, index) =>
                  product !== undefined && (
                    <WareHouseOrder
                      warehouse={wh}
                      product={product}
                      orderAmount={orderAmount}
                      setOrderAmount={setOrderAmount}
                      index={index}
                    />
                  )
              )}
            </div>
            <button className={styles.buttonOrder} onClick={CreateOrder}>
              Создать заявку
            </button>
          </>
        )}
      </div>
    </div>
  );
};
