import { ChangeEvent } from "react";
import { Product } from "../../../types/Product";
import { WareHouse } from "../../../types/WareHouse";
import styles from "./WareHouseAddProduct.module.scss";

interface WareHouseAddProductProps {
  warehouse: WareHouse;
  product: Product;
  addProductAmount: number[];
  setAddProductAmount: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}

export const WareHouseAddProduct = ({
  warehouse,
  product,
  addProductAmount,
  setAddProductAmount,
  index,
}: WareHouseAddProductProps) => {
  const amount = product.number[index];

  function decrementArrayValue(array: number[], index: number) {
    const newArray = [...array];
    newArray[index] = newArray[index] - 1;
    setAddProductAmount(newArray);
  }

  function setArrayValue(array: number[], index: number, value: number) {
    const newArray = [...array];
    newArray[index] = value;
    setAddProductAmount(newArray);
  }

  function incrementArrayValue(array: number[], index: number) {
    const newArray = [...array];
    newArray[index] = newArray[index] + 1;
    setAddProductAmount(newArray);
  }

  return (
    <div className={styles.warehouseContainer}>
      <h2>
        {warehouse.name} склад: {amount} штук
      </h2>
      <div className={styles.buttonsContainer}>
        <button
          className="productOrderButton"
          disabled={addProductAmount[index] === 0}
          onClick={() => decrementArrayValue(addProductAmount, index)}
        >
          -
        </button>

        <input
          type="number"
          className={styles.productAddProductAmountInput}
          id="productAddProductAmount"
          name="productAddProductAmount"
          value={addProductAmount[index]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArrayValue(addProductAmount, index, Number(e.target.value))
          }
          min={0}
          max={99999999}
        />
        <button
          className={styles.productOrderButton}
          onClick={() => incrementArrayValue(addProductAmount, index)}
        >
          +
        </button>
      </div>
    </div>
  );
};
