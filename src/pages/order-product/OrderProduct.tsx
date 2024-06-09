import { Header } from "../../components/Header/Header";
import imagePlaceholder from "../../assets/images/image_placeholder.png";
import "./OrderProduct.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";

interface WareHouse {
  name: string;
}
interface WareHouseInfoProps {
  warehouse: WareHouse;
  product: Product;
  orderAmount: number[];
  setOrderAmount: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}

const WareHouseInfo = ({
  warehouse,
  product,
  orderAmount,
  setOrderAmount,
  index,
}: WareHouseInfoProps) => {
  const amount = product.number[index];

  function decrementArrayValue(array: number[], index: number) {
    const newArray = [...array];
    newArray[index] = newArray[index] - 1;
    setOrderAmount(newArray);
  }

  function setArrayValue(array: number[], index: number, value: number) {
    const newArray = [...array];
    newArray[index] = value;
    setOrderAmount(newArray);
  }

  function incrementArrayValue(array: number[], index: number) {
    const newArray = [...array];
    newArray[index] = newArray[index] + 1;
    setOrderAmount(newArray);
  }

  return (
    <div className="whProductNumber">
      <h2>
        {warehouse.name} склад: {amount} штук
      </h2>
      <div className="buttonsContainer">
        <button
          className="productOrderButton"
          disabled={orderAmount[index] === 0}
          onClick={() => decrementArrayValue(orderAmount, index)}
        >
          -
        </button>
        <input
          type="number"
          className="productOrderAmountInput"
          id="productOrderAmount"
          name="productOrderAmount"
          value={orderAmount[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArrayValue(orderAmount, index, Number(e.target.value))
          }
          min={0}
          max={amount}
        />
        <button
          className="productOrderButton"
          disabled={orderAmount[index] >= product.number[index]}
          onClick={() => incrementArrayValue(orderAmount, index)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const OrderProduct = () => {
  const [product, setProduct] = useState<Product>();
  const [orderAmount, setOrderAmount] = useState<number[]>([]);
  const [warehouseList, setWarehouseList] = useState<WareHouse[]>([]);
  const { id } = useParams();
  const productAmount = product?.number.reduce(
    (acc, amount) => acc + amount,
    0
  );

  useEffect(() => {
    setOrderAmount(product?.number.map((el) => (el !== 0 ? 1 : 0)) || []);
  }, [product]);

  async function CreateOrder() {
    const response = await fetch(`http://localhost:5000/product/orderProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_product: product?.id,
        number: orderAmount,
        id_user: 5,
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
      <div className="orderProductContainer">
        <div className="productInfoContainer">
          <img className="productImage" src={imagePlaceholder} />
          <h2 className="productTitle">{product?.name}</h2>
          <ul className="productCharsContainer">
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
        <div className="productWHAmountContainer">
          <h3>Всего в наличии: {productAmount}</h3>
        </div>
        <div className="whProductNumberContainer">
          {warehouseList.map(
            (wh, index) =>
              product !== undefined && (
                <WareHouseInfo
                  warehouse={wh}
                  product={product}
                  orderAmount={orderAmount}
                  setOrderAmount={setOrderAmount}
                  index={index}
                />
              )
          )}
        </div>
        <button className="buttonOrder" onClick={CreateOrder}>
          Заказать
        </button>
      </div>
    </div>
  );
};
