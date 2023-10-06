import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { CartPlus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import QuantityControl from "../QuantityControl/QuantityControl";

const CardP = ({ id, title, price, image, stock }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // Obtén el carrito del estado global

  // Verifica si el producto ya está en el carrito y obtén su cantidad
  const cartItem = cart.find((item) => item.id === id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (product, quantity) => {
    if (cartQuantity + quantity <= stock) {
      // Verifica si es posible agregar más unidades al carrito
      dispatch(addToCart({ ...product, quantity }));
    }
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
                  productId={id}
                  initialQuantity={1}
                  stock={stock - cartQuantity} // Resta las unidades en el carrito al stock disponible
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(newQuantity)
                  }
                />
              </div>
            </div>
          </div>
        </Card.Body>
        <button
          className={style.button}
          onClick={() => handleAddToCart({ id, title, price, image, stock }, 1)}
          disabled={cartQuantity >= stock}
        >
          {cartQuantity >= stock ? (
            "Stock Agotado"
          ) : (
            <>
              <CartPlus /> Agregar
            </>
          )}
        </button>
      </Card>
    </div>
  );
};

export default CardP;
