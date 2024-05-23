import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { Header } from "../../components/Header/Header";
import styles from "./OrdersHistory.module.scss";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { formatDate } from "../../utils/parseDate";

export const OrdersHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [maxColumns, setMaxColumns] = useState(0);

  useEffect(() => {
    async function getOrders(): Promise<Order[]> {
      const response = await fetch(`http://localhost:5000/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      data.sort((a: Order, b: Order) => a.id_order - b.id_order);
      setOrders(data);
      return data;
    }

    getOrders();
  }, []);

  useEffect(() => {
    const maxCols = Math.max(
      ...orders.map((order: Order) => order.order_number.length)
    );
    setMaxColumns(maxCols);
  }, [orders]);

  async function putOrderStatus(
    orderId: number,
    isCompleted: boolean
  ): Promise<Order[]> {
    const response = await fetch(`http://localhost:5000/order/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_order: orderId,
        is_completed: isCompleted,
      }),
    });
    const data = await response.json();
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id_order === orderId
          ? { ...order, is_completed: isCompleted }
          : order
      )
    );
    return data;
  }

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
            {Array.from({ length: maxColumns }, (_, index) => (
              <th key={index}>Количество товаров со склада {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td
                onClick={() =>
                  putOrderStatus(order.id_order, !order.is_completed)
                }
              >
                <div className={styles.status}>
                  {order.is_completed ? <CheckIcon /> : <CloseIcon />}
                </div>
              </td>
              <td>{order.id_order}</td>
              <td>{order.user_id}</td>
              <td>{order.id_product}</td>
              <td>{order.name}</td>
              <td>{formatDate(order.date)}</td>
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
