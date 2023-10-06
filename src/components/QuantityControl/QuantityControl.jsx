import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./QuantityControl.module.css";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../redux/actions/actions";

function QuantityControl({
  initialQuantity,
  stock,
  productId,
  onQuantityChange,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const incrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantityInCart(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantityInCart(newQuantity);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
      updateQuantityInCart(newQuantity);
    }
  };

  const updateQuantityInCart = (newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
    onQuantityChange(newQuantity);
  };

  return (
    <div className={styles.quantityButtonsContainer}>
      <button className={styles.quantityButton} onClick={incrementQuantity}>
        +
      </button>
      <input
        type="number"
        className={styles.quantity}
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        max={stock}
      />
      <button className={styles.quantityButton} onClick={decrementQuantity}>
        -
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default QuantityControl;
