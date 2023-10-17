import styles from "./ReviewedProducts.module.css";
import React, { useState, useEffect } from "react";
import HopPassionClient from "../../../../utils/NetworkingUtils";
import { useParams } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

function ReviewedProducts() {
  const [reviewedProducts, setReviewedProducts] = useState({
    comment: "",
    lastName: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchReviewedProducts = async () => {
    try {
      const response = await HopPassionClient.get(`/product/qualified/${id}`);
      setReviewedProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener productos reseñados", error);
      setIsLoading(false);
    }
  };
  console.log(reviewedProducts);

  const handleSave = async (editedReview) => {
    try {
      const { id, comment, rating, productId } = editedReview;
      const updatedReview = {
        id,
        comment,
        rating,
      };
      const response = await HopPassionClient.put(
        `/review/update/${id}`,
        updatedReview
      );

      if (response.status === 200) {
        setEditingProduct(null);
      } else {
        console.error("Error al actualizar la revisión:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar la revisión:", error);
    }
  };

  const handleEdit = (productId) => {
    setEditingProduct(productId);
  };

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return totalRating / reviews.length;
  }

  useEffect(() => {
    fetchReviewedProducts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        reviewedProducts.map((product) => (
          <div key={product.id} className={styles.product}>
            <div className={styles.productHeader}>
              <h2 className={styles.productName}>{product.name}</h2>
              <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= calculateAverageRating(product.Reviews) ? (
                      <StarFill className={styles.starFill} />
                    ) : (
                      <Star className={styles.starOutline} />
                    )}
                  </span>
                ))}
                {editingProduct === product.id ? (
                  <button
                    className={styles.button}
                    onClick={() => handleSave(product)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className={styles.button}
                    onClick={() => handleEdit(product.id)}
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
            {product.Reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                {editingProduct === product.id ? (
                  <input
                    type="text"
                    className={styles.input}
                    onChange={(e) => {
                      const updatedReview = { ...review };
                      updatedReview.comment = e.target.value;
                      handleSave(updatedReview);
                    }}
                  />
                ) : (
                  <p className={styles.productReview}>{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewedProducts;
