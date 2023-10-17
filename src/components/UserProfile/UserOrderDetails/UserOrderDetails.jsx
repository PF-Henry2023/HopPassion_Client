import { useState, useEffect } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";
import styles from "./UserOrderDetails.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import Loading from "../../Loading/Loading";
import { useParams } from "react-router-dom";

const UserOrderDetails = ({ orderId, onBackClick }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrdersDetails] = useState([]);

  async function getOrderDetails(orderId) {
    setIsLoading(true);
    try {
      const response = await HopPassionClient.get(`/orders/${orderId}`);
      setOrdersDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener el detalle de la órden", error);
    }
  }

  useEffect(() => {
    getOrderDetails(orderId);
  }, [orderId, id]);

  return (
    <div className={styles.header}>
      <ArrowLeft className={styles.backButton} onClick={onBackClick} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
         <h1>Detalles de la orden</h1>
          <p>ID de la orden: {orderId}</p>
          <p>Fecha de creación: {orderDetails.created_at}</p>
          <p>Estado de la orden: {orderDetails.status}</p>
          <h2>Dirección de envío:</h2>
          <p>Calle: {orderDetails.address.street}</p>
          <p>Código Postal: {orderDetails.address.postal_code}</p>
          <p>Ciudad: {orderDetails.address.city}</p>
          <p>País: {orderDetails.address.country}</p>
          <h2>Productos:</h2>
          <ul>
            {orderDetails.products.map((product, index) => (
              <li key={index}>
                <p>Nombre del producto: {product.name}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio unitario: ${product.price}</p>
                <p>Subtotal: ${product.subtotal}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
