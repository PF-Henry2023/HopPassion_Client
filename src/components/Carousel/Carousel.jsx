import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import logotype from "../../assets/logo_brand.png";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./ControlledCarousel.module.css";
import { Link } from "react-router-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <img
            className={`d-block w-100 ${styles.image}`}
            src={image1}
            alt="First slide"
          />
          <div className={styles.overlay}>
            <img src={logotype} alt="Logo" className={styles.logo} />
            <p className={styles.description}>
              Tu destino en línea para explorar y adquirir una amplia variedad
              de cervezas artesanales y especialidades excepcionales.
            </p>
            <hr />
            <button className={styles.button}>
              Descubre Nuestras Cervezas
            </button>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className={styles.imageContainer}>
          <img
            className={`d-block w-100 ${styles.image}`}
            src={image2}
            alt="First slide"
          />
          <div className={styles.overlay}>
            <img src={logotype} alt="Logo" className={styles.logo} />
            <p className={styles.description}>
              ¡Únete a nuestra comunidad cervecera
            </p>
            <p className={styles.description}>
              y descubre un mundo de sabores!
            </p>
            <hr />
            <button className={styles.button}>Registrate</button>
            <Link className={styles.link }to="/login">
              {" "}
              <h5>o Inicia seión</h5>
            </Link>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className={styles.imageContainer}>
          <img
            className={`d-block w-100 ${styles.image}`}
            src={image3}
            alt="First slide"
          />
          <div className={styles.overlay}>
            <img src={logotype} alt="Logo" className={styles.logo} />
            <p className={styles.description}>
              Descubre Nuestras Cervezas Destacadas
            </p>
            <hr />
            <button className={styles.button}>Explorar Ahora</button>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
