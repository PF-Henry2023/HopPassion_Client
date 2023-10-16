import styles from "./UserReviews.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";
import { useParams } from "react-router-dom";


const PendingReviews = ({ onBackClick }) => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchPendingProducts = async () => {
    try {
      const response = await HopPassionClient.get(`/product/qualify/${id}`);
      console.log (response)
      setPendingProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener productos pendientes", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ArrowLeft className={styles.backButton} onClick={onBackClick} />
      </div>
      {isLoading ? (
        <p>Cargando productos pendientes...</p>
      ) : (
        <div>
          <h1>Productos Pendientes de Revisión</h1>
          <ul>
            {pendingProducts.map((product) => (
              <li key={product.id}>
                <h2>{product.name}</h2>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PendingReviews;
