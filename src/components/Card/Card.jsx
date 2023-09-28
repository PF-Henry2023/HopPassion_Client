import style from "./Card.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ejemploImagen from "../../assets/ejemploImagen.png";

const CardP = () => {
  return (
    <div className={`${style.container} d-flex justify-content-center`}>
      <Card style={{ width: "12rem", marginRight: "30px" }}>
        <Card.Img variant="top" src={ejemploImagen} />
        <Card.Body>
          <Card.Title>Cerveza IPA</Card.Title>
          <Card.Text className={style.customTextColor}>$ 1200</Card.Text>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Contenedor para alinear el botón a la derecha */}
            <button className={style.button}>Agregar</button>
          </div>
        </Card.Body>
      </Card>

      <Card style={{ width: "12rem", marginRight: "30px" }}>
        <Card.Img variant="top" src={ejemploImagen} />
        <Card.Body>
          <Card.Title>Cerveza IPA</Card.Title>
          <Card.Text className={style.customTextColor}>$ 1200</Card.Text>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Contenedor para alinear el botón a la derecha */}
            <button className={style.button}>Agregar</button>
          </div>
        </Card.Body>
      </Card>

      <Card style={{ width: "12rem", marginRight: "30px" }}>
        <Card.Img variant="top" src={ejemploImagen} />
        <Card.Body>
          <Card.Title>Cerveza IPA</Card.Title>
          <Card.Text className={style.customTextColor}>$ 1200</Card.Text>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Contenedor para alinear el botón a la derecha */}
            <button className={style.button}>Agregar</button>
          </div>
        </Card.Body>
      </Card>

      <Card style={{ width: "12rem", marginRight: "30px" }}>
        <Card.Img variant="top" src={ejemploImagen} />
        <Card.Body>
          <Card.Title>Cerveza IPA</Card.Title>
          <Card.Text className={style.customTextColor}>$ 1200</Card.Text>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Contenedor para alinear el botón a la derecha */}
            <button className={style.button}>Agregar</button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardP;
