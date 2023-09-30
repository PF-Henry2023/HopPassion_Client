import style from "./Card.module.css";
import Card from "react-bootstrap/Card";

const CardP = ({title, price, image}) => {

  return (
      <Card style={{ width: "250px", height:"400px" }}>
        <Card.Img variant="top" src={image} className={style.image}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={style.customTextColor}>${price}</Card.Text>
          <div className="d-flex justify-content-end">
            {" "}
            {/* Contenedor para alinear el botón a la derecha */}
            <button className={style.button}>Agregar</button>
          </div>
        </Card.Body>
      </Card>
  );
};

export default CardP;
