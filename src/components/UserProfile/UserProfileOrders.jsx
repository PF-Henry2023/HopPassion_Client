import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import HopPassionClient from "../../utils/NetworkingUtils";
import styles from "./UserProfileOrders.module.css";

const UserProfileOrder = ({ id, status, createdAt, total }) => {
  function mapStatusToStatus(status) {
    switch (status) {
      case "send":
        return "Confirmado";
      case "delivered":
        return "Entregado";
      default:
        return "";
    }
  }

  function mapCreatedAtToDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.row}>
          <h2>Fecha del pedido:</h2>
          <h2 className={styles.totalSubtitle}>Total:</h2>
          <h2>Estado del pedido:</h2>
        </div>
        <div className={styles.row}>
          <p>{mapCreatedAtToDate(createdAt)}</p>
          <p>${total}</p>
          <p className={styles.status}>{mapStatusToStatus(status)}</p>
        </div>
        <div className={styles.row}></div>
        <h2>Número de orden:</h2>
        <div className={styles.row}>
          <p>{id}</p>
        </div>
      </div>
      <button>Ver detalle del pedido</button>
    </div>
  );
};

const UserProfileOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setIsLoading(true);
    try {
      const response = await HopPassionClient.get("/orders");
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener las ordenes del usuario", error);
    }
  }

  function drawDefault() {
    return (
      <div className={styles.mainContainer}>
        <h1>Mis compras</h1>
        <div>
          {orders.map((order) => (
            <div className={styles.purchaseContainer} key={order.id}>
              <UserProfileOrder
                id={order.id}
                status={order.status}
                createdAt={order.created_at}
                total={order.total}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function drawLoading() {
    return <Loading />;
  }

  function drawComponent() {
    if (isLoading) {
      return drawLoading();
    } else {
      return drawDefault();
    }
  }

  return <>{drawComponent()}</>;
};

export default UserProfileOrders;
