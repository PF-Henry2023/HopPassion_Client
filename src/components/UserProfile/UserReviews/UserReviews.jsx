import styles from "./UserReviews.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";
import { useParams } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const PendingReviews = ({ onBackClick }) => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedProducts, setExpandedProducts] = useState({});
  const [productRatings, setProductRatings] = useState({});
  const [userComment, setUserComment] = useState("");

  const fetchPendingProducts = async () => {
    try {
      const response = await HopPassionClient.get(`/product/qualify/${id}`);
      console.log(response);
      setPendingProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener productos pendientes", error);
      setIsLoading(false);
    }
  };

  const fetchReviewedProducts = async () => {
    try {
      const response = await HopPassionClient.get(`/product/qualified/${id}`);
      setReviewedProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos reseñados", error);
    }
  };

  const switchToPendingTab = () => {
    setActiveTab("pending");
  };

  const switchToReviewedTab = () => {
    setActiveTab("reviewed");
  };

  const productAccordion = (productId) => {
    setExpandedProducts((prevExpandedProducts) => ({
      ...prevExpandedProducts,
      [productId]: !prevExpandedProducts[productId],
    }));
  };

  const handleRatingChange = (productId, rating) => {
    setProductRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  const saveProductDescription = async (productId, comment) => {
    try {
      const product = pendingProducts.find(
        (product) => product.id === productId
      );
  
      const reviewData = {
        idProd: productId,
        idUser: id,
        comment: comment,
        rating: productRatings[productId],
      };
      setIsLoading(true);
  
      const response = await HopPassionClient.post(
        "/review/create",
        reviewData
      );
  
      if (response.status !== 200) {
        console.error(
          "Error al crear la revisión:",
          response.status,
          response.statusText
        );
      } else {
        Swal.fire({
          icon: "success",
          title: "Reseña guardada exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        });
  
        setPendingProducts((prevPendingProducts) =>
          prevPendingProducts.filter((product) => product.id !== productId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPendingProducts();
    fetchReviewedProducts();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <ArrowLeft className={styles.backButton} onClick={onBackClick} />
        Mis compras
      </div>
      <h1 className={styles.title}>Calificaciones</h1>

      <div className={styles.mainContainer}>
        <div className={styles.tabs}>
          <button
            onClick={switchToPendingTab}
            className={activeTab === "pending" ? styles.activeTab : ""}
          >
            Pendientes
          </button>
          <button
            onClick={switchToReviewedTab}
            className={activeTab === "reviewed" ? styles.activeTab : ""}
          >
            Reseñados
          </button>
        </div>

        <div className={styles.container}>
          {isLoading ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : (
            <div>
              {activeTab === "pending" && (
                <div>
                  <ul>
                    {pendingProducts.map((product) => (
                      <div key={product.id} className={styles.product}>
                        <div
                          className={styles.productHeader}
                          onClick={() => productAccordion(product.id)}
                        >
                          <img
                            src={product.image}
                            className={styles.image}
                            alt={product.name}
                          />
                          <h2 className={styles.productName}>{product.name}</h2>
                          <div className={styles.rating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() =>
                                  handleRatingChange(product.id, star)
                                }
                              >
                                {star <= productRatings[product.id] ? (
                                  <StarFill className={styles.starFill} />
                                ) : (
                                  <Star className={styles.starOutline} />
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                        {expandedProducts[product.id] && (
                          <div className={styles.productReview}>
                            <input
                              type="text"
                              onChange={(e) => setUserComment(e.target.value)}
                            />
                            <button
                              onClick={() =>
                                saveProductDescription(product.id, userComment)
                              }
                            >
                              Guardar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "reviewed" && (
                <div>
                  <ul>
                    {reviewedProducts.map((product) => (
                      <label key={product.id}>
                        <h2 className={styles.productName}>{product.name}</h2>
                      </label>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PendingReviews;
