import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import QuantityControl from "../QuantityControl/QuantityControl";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.items);

  const calculateCartItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartTotal}>
        <h1>Mi carrito</h1>
      </div>
      <div>
        {cart.map((cartItem) => (
          <div key={cartItem.id} className={styles.cartItem}>
            <img
              src={cartItem.image}
              className={styles.cartItemImage}
              alt={`${cartItem.id}`}
            />
            <div className={styles.cartItemInfo}>
              <h3 className={styles.cartItemName}>{cartItem.name}</h3>
              <div className={styles.cartItemDetails}>
                <p className={styles.cartItemPrice}>
                  Precio por unidad: ${cartItem.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className={styles.cartItemButtons}>
              <button
                className={styles.cartItemButton}
                onClick={() => handleRemoveFromCart(cartItem.id)}
              >
                Eliminar
              </button>
              <QuantityControl
                initialQuantity={cartItem.quantity}
                stock={cartItem.stock}
                onQuantityChange={(newQuantity) => {
                  // Debes implementar la lógica para actualizar la cantidad en el carrito aquí
                  // Puedes dispatch una acción que actualice la cantidad en el carrito
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleClearCart}>Vaciar carrito</button>
      <h2>Total: ${cart.reduce((total, item) => total + calculateCartItemTotal(item), 0).toFixed(2)}</h2>
      <p className={styles.cartItemSubtotal}>*Subtotal de compra</p>
      <button>Pagar</button>
      <button>Ver carrito</button>
    </div>
  );
};

export default Cart;
