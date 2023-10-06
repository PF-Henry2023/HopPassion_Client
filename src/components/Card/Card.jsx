import React, { useState } from "react";
import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { CartPlus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import Counter from "../Counter/Counter";
import Swal from "sweetalert2";

const CardP = ({ id, title, price, image, stock }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const initialQuantity = 0;

  const [cartQuantity, setCartQuantity] = useState(0);

  const handleAddToCart = (product, quantity) => {
    if (cartQuantity + quantity <= stock) {
      dispatch(addToCart({ ...product, quantity }));
      setCartQuantity(cartQuantity + quantity);
    }
    Swal.fire({
      icon: "success",
      title: "Producto agregado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
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
                <Counter
                  productId={id} // Usar la propiedad 'id' del producto
                  initialQuantity={initialQuantity}
                  stock={stock - cartQuantity}
                  onQuantityChange={(newQuantity) => {
                    console.log("Nueva cantidad:", newQuantity);
                  }}
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
