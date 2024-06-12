import { ChangeEvent, useEffect } from "react";
import { Product } from "../../../types/Product";
import { WareHouse } from "../../../types/WareHouse";
import styles from "./WareHouseOrder.module.scss";


interface WareHouseInfoProps {
  warehouse: WareHouse;
  product: Product;
  orderAmount: number[];
  setOrderAmount: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}

export const WareHouseOrder = ({
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
    <div className={styles.whProductNumber}>
      <h2>
        {warehouse.name} склад: {amount} штук
      </h2>
      <div className={styles.buttonsContainer}>
        <button
          className="productOrderButton"
          disabled={orderAmount[index] === 0}
          onClick={() => decrementArrayValue(orderAmount, index)}
        >
          -
        </button>
        <input
          type="number"
          className={styles.productOrderAmountInput}
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
          className={styles.productOrderButton}
          disabled={orderAmount[index] >= product.number[index]}
          onClick={() => incrementArrayValue(orderAmount, index)}
        >
          +
        </button>
      </div>
    </div>
  );
};
