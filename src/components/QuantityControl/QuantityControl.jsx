import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./QuantityControl.module.css";

function QuantityControl({ initialQuantity, stock, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      onQuantityChange(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className={styles.quantityButtonsContainer}>
      <button className={styles.quantityButton} onClick={incrementQuantity}>
        +
      </button>
      <p onChange={handleQuantityChange} className={styles.quantityInput}>
        {quantity}
      </p>
      <button className={styles.quantityButton} onClick={decrementQuantity}>
        -
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default QuantityControl;
