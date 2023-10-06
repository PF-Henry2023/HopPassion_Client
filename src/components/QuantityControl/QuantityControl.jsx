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
  
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
    onQuantityChange(newQuantity);
  };
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const incrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      handleQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleQuantityChange(newQuantity);
    }
  };

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div className={styles.quantityButtonsContainer}>
      <button className={styles.quantityButton} onClick={incrementQuantity}>
        +
      </button>
      <input
        type="number"
        className={styles.quantity}
        value={quantity}
        onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
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
