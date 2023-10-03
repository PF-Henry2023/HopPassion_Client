import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/actions/actions";
import { Cart } from "react-bootstrap-icons";

import Footer from "../Footer/Footer";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      await dispatch(getProductById(id));
      setIsLoading(false);
    };

    fetchProductDetails();
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.column}>
            <button className={styles.goBackButton} onClick={handleGoBack}>
              Volver
            </button>
          </div>

          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <div className={styles.column}>
                <div className={styles.imageContainer}>
                  <img
                    src={productDetails.image}
                    className={styles.image}
                    alt={`${productDetails.id}`}
                  />
                </div>
                <p className={styles.description}>
                  {productDetails.description}
                </p>
              </div>

              <div className={styles.column}>
                <h1 className={styles.title}>{productDetails.name}</h1>
                <p className={styles.price}>$ {productDetails.price}</p>
                <p className={styles.quantity}>Cantidad: </p>
                <p className={styles.quantity}>
                  {productDetails.stock} unidades disponibles
                </p>
                <button className={styles.addToCartButton}>
                  <Cart /> + Agregar al carrito
                </button>
                <div className={styles.box}>
                  <div className={styles.firstrow}>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>Categoría:</h6>
                      <p className={styles.subTitle}>{productDetails.categories.join(", ")}</p>
                    </div>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>País de Origen:</h6>
                      <p className={styles.subTitle}>
                        {productDetails.country}
                      </p>
                    </div>
                  </div>
                  <div className={styles.secondRow}>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>
                        Graduación alcohólica:
                      </h6>
                      <p className={styles.subTitle}>
                        {productDetails.alcoholContent}%
                      </p>
                    </div>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>Volumen:</h6>
                      <p className={styles.subTitle}>
                        {productDetails.amountMl} ml.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
