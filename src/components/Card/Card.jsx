import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { CartPlus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const CardP = ({ id, title, price, image }) => {
  return (
    <Link to={`/product/${id}`} className={style.link}>
      <div className={style.container}>
        <Card style={{ width: "255px", height: "400px", border: "none" }}>
          <div className={style.imageWrapper}>
            <Card.Img variant="top" src={image} className={style.image} />
          </div>
          <Card.Body>
            <div className={style.infoWrapper}>
              <Card.Title>{title}</Card.Title>
              <Card.Text className={style.customTextColor}>${price}</Card.Text>
            </div>
          </Card.Body>
          <button className={style.button}>
            <CartPlus /> Agregar
          </button>
        </Card>
      </div>
    </Link>
  );
};

export default CardP;
