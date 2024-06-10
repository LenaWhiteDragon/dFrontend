import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import { Header } from "../../components/Header/Header";
import styles from "./OrdersHistory.module.scss";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { formatDate } from "../../utils/parseDate";
import { NavBar } from "../../components/NavBar/NavBar";
import { PageContainer } from "../../layout/PageContainer/PageContainer";
import { authStorage } from "../../features/auth/authStorage";
import { UserRole } from "../../types/UserRole";

export const OrdersHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [maxColumns, setMaxColumns] = useState(0);

  useEffect(() => {
    async function getOrders() {
      const response = await fetch(`http://localhost:5000/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const readyData = data
        .filter((order: Order) =>
          Number(authStorage.roleId) === UserRole.Operator
            ? order.user_id === Number(authStorage.userId)
            : order
        )
        .sort((a: Order, b: Order) => a.id_order - b.id_order);
      setOrders(readyData);
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
      <PageContainer>
        <NavBar />
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
                <td className={styles.statusContainer}>
                  <div
                    className={styles.status}
                    onClick={() =>
                      putOrderStatus(order.id_order, !order.is_completed)
                    }
                  >
                    {order.is_completed ? <CheckIcon /> : <CloseIcon />}
                  </div>
                </td>
                <td className={styles.centeredText}>{order.id_order}</td>
                <td className={styles.centeredText}>{order.user_id}</td>
                <td className={styles.centeredText}>{order.id_product}</td>
                <td>{order.name}</td>
                <td>{formatDate(order.date)}</td>
                {Array.from({ length: maxColumns }, (_, index) => (
                  <td key={index} className={styles.centeredText}>
                    {order.order_number[index]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </PageContainer>
    </div>
  );
};
