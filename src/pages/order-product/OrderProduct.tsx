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
      let productAmountToSet: number[] = [];
      product.number.forEach(() => {
        productAmountToSet.push(0);
      });
      setAddProductAmount(productAmountToSet);
    }
  }, [product]);

  async function CreateSupply() {
    const response = await fetch(
      `http://localhost:5000/product/AAAAAAAAAAAAAAAAAAAAAAA`,
      {
        // ЗДЕСЬ ПОДПРАВИТЬ РОУТ МОЖЕТ БЫТЬ
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product: product?.id,
          // number: addProductAmount, // ЗДЕСЬ УБЕДИТЬСЯ ЧТО НА БЕКЕ ПРОИСХОДИТ
          id_user: authStorage.userId,
        }),
      }
    );
    alert("Поставка произведена");
  }

  async function CreateOrder() {
    const response = await fetch(`http://localhost:5000/product/orderProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_product: product?.id,
        number: orderAmount,
        id_user: authStorage.userId,
      }),
    });
    alert("Заказ выполнен");
  }

  useEffect(() => {
    async function getProduct(): Promise<Product> {
      const response = await fetch(
        `http://localhost:5000/product/getProductById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProduct(data);
      return data;
    }
    getProduct();
  }, []);

  useEffect(() => {
    async function getWarehouse(): Promise<WareHouse[]> {
      const response = await fetch(`http://localhost:5000/wh/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setWarehouseList(data);
      return data;
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
              Добавить поставку
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
              Заказать
            </button>
          </>
        )}
      </div>
    </div>
  );
};
