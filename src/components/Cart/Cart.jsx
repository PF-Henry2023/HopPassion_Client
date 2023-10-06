import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
} from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import QuantityControl from "../QuantityControl/QuantityControl";
import Return from "../Return/Return";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const calculateCartItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
  };

  return (
    <>
      <Navbar />
      <div className={styles.cartContainer}>
        {/* Columna 1 */}
        <div className={styles.column}>
          <Return />
        </div>

        {/* Columna 2 */}
        <div className={styles.column}>
          <div className={styles.cartTotal}>
            <h1>Mi carrito</h1>
          </div>

          {/* Subtítulos en la segunda fila */}
          <div className={styles.subtitles}>
            <div className={styles.subtitle}>Producto</div>
            <div className={styles.subtitle}>Precio</div>
            <div className={styles.subtitle}>Cantidad</div>
            <div className={styles.subtitle}></div>{" "}
            {/* Espacio para el botón de eliminar */}
          </div>

          {/* Lista de productos */}
          {cart.map((cartItem) => (
            <div key={cartItem.id} className={styles.cartItem}>
              <div>
                <img
                  src={cartItem.image}
                  className={styles.cartItemImage}
                  alt={`${cartItem.id}`}
                />
                <div className={styles.cartItemName}>{cartItem.title}</div>
              </div>
              <p className={styles.cartItemPrice}>
                Precio por unidad: ${cartItem.price.toFixed(2)}
              </p>
              <QuantityControl
                initialQuantity={cartItem.quantity}
                stock={cartItem.stock}
                productId={cartItem.id}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(cartItem.id, newQuantity)
                }
              />
              <button
                className={styles.cartItemButton}
                onClick={() => handleRemoveFromCart(cartItem.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Columna 3 */}
        <div className={styles.column}>
          <div className={styles.subtotal}>
            <div>Subtotal</div>
            <div>
              $
              {cart
                .reduce(
                  (total, item) => total + calculateCartItemTotal(item),
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.gastosEnvio}>
            <div>Gastos de envío</div>
            <div>$500</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.total}>
            <div>Total</div>
            <div>
              $
              {(
                cart.reduce(
                  (total, item) => total + calculateCartItemTotal(item),
                  0
                ) + 500
              ) // Agrega los gastos de envío al total
                .toFixed(2)}
            </div>
          </div>
          <div className={styles.buttons}>
            <button>Proceder al pago</button>
            <button>Elegir más productos</button>
            <button onClick={handleClearCart}>Vaciar Carrito</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
