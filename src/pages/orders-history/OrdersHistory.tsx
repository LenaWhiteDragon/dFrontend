import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { Header } from "../../components/Header/Header";
import styles from "./OrdersHistory.module.scss";

export const OrdersHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const testAmount = [1, 4, 1, 4];
  useEffect(() => {
    async function getOrders(): Promise<Order[]> {
      const response = await fetch(`http://localhost:5000/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOrders(data);
      console.log(data);
      return data;
    }
    getOrders();
  }, []);
  return (
    <div>
      <Header />
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Исполнено</th>
            <th>Id заказа</th>
            <th>Id клиента</th>
            <th>Id продукта</th>
            <th>Название товара</th>
            <th>Время заказа</th>
            {testAmount.map((_, index) => (
              <th>Количество товаров со склада {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.is_completed ? "+" : "-"}</td>
              <td>{order.id_order}</td>
              <td>{order.user_id}</td>
              <td>{order.id_product}</td>
              <td>{order.name}</td>
              <td>{order.date}</td>
              {order.order_number.map((number) => (
                <td>{number}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
