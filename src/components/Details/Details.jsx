import React from "react";
import Navbar from "../Navbar/Navbar";
import ejemploImagen from "../../assets/ejemploImagen.png";
import styles from "./Details.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Details = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.container}>
          {/* Primera columna */}
          <div className={styles.column}>
            <button className={styles.goBackButton} onClick={handleGoBack}>
              Volver
            </button>
          </div>

          <div className={styles.column}>
            <div className={styles.imageContainer}>
              <img
                src={ejemploImagen}
                className={styles.image}
                alt="Cerveza IPA"
              />
            </div>
            <p className={styles.description}>
              Una auténtica joya de la cervecería nacional, nuestra rubia te
              sorprenderá con su frescura y sabor incomparables. ¡Agrega un
              toque local a tu carrito!
            </p>
          </div>

          <div className={styles.column}>
            <h1 className={styles.title}>Cerveza IPA</h1>
            <p className={styles.price}>$ 1200</p>
            <p className={styles.quantity}>Cantidad: </p>
            <p className={styles.quantity}>300 unidades disponibles</p>
            <button className={styles.addToCartButton}>
              + Agregar al carrito
            </button>
            <div className={styles.box}>
              <div className={styles.firstrow}>
                <div className={styles.row}>
                  <h6 className={styles.subTitle}>Categoría:</h6>
                  <p className={styles.subTitle}>American Ipa</p>
                </div>
                <div className={styles.row}>
                  <h6 className={styles.subTitle}>País de Origen:</h6>
                  <p className={styles.subTitle}>Argentina</p>
                </div>
              </div>
              <div className={styles.secondRow}>
                <div className={styles.row}>
                  <h6 className={styles.subTitle}>Graduación alcohólica:</h6>
                  <p className={styles.subTitle}>5%</p>
                </div>
                <div className={styles.row}>
                  <h6 className={styles.subTitle}>Volumen:</h6>
                  <p className={styles.subTitle}>330 ml.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
