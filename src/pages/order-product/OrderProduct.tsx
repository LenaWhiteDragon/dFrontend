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
  amount: number;
}

const WareHouseInfo = ({ warehouse, amount }: WareHouseInfoProps) => {
  const [orderAmount, setOrderAmount] = useState<number>(0);

  return (
    <div className="whProductNumber">
      <h2>
        {warehouse.name} склад: {amount} штук
      </h2>
      <div className="buttonsContainer">
        <button
          className="productOrderButton"
          disabled={orderAmount === 0}
          onClick={() => setOrderAmount(orderAmount - 1)}
        >
          -
        </button>
        <input
          type="number"
          className="productOrderAmountInput"
          id="productOrderAmount"
          name="productOrderAmount"
          value={orderAmount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOrderAmount(Number(e.target.value))
          }
          min={0}
          max={amount}
        />
        <button
          className="productOrderButton"
          disabled={orderAmount >= amount}
          onClick={() => setOrderAmount(orderAmount + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const OrderProduct = () => {
  const [product, setProduct] = useState<Product>();
  const [warehouseList, setWarehouseList] = useState<WareHouse[]>([]);
  const { id } = useParams();
  const productAmount = product?.number.reduce(
    (acc, amount) => acc + amount,
    0
  );

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
              product?.number[index] !== undefined && (
                <WareHouseInfo warehouse={wh} amount={product.number[index]} />
              )
          )}
        </div>
        <button>Заказать</button>
      </div>
    </div>
  );
};
