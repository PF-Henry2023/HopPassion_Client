import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { CartPlus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import QuantityControl from "../QuantityControl/QuantityControl";

const CardP = ({ id, title, price, image, stock }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className={style.container}>
      <Card style={{ width: "255px", height: "450px", border: "none" }}>
        <div className={style.imageWrapper}>
          <Link to={`/product/${id}`} className={style.link}>
            <Card.Img variant="top" src={image} className={style.image} />
          </Link>
        </div>
        <Card.Body>
          <div className={style.infoWrapper}>
            <Card.Title>{title}</Card.Title>
            <div className={style.row}>
              <div>
                <Card.Text className={style.customTextColor}>
                  ${price}
                </Card.Text>
              </div>
              <div>
                <QuantityControl
                  initialQuantity={1}
                  stock={stock}
                  onQuantityChange={(newQuantity) =>
                    handleAddToCart(
                      { id, title, price, image, stock },
                      newQuantity
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Card.Body>
        <button
          className={style.button}
          onClick={() => handleAddToCart({ id, title, price, image, stock }, 1)}
        >
          <CartPlus /> Agregar
        </button>
      </Card>
    </div>
  );
};

export default CardP;
