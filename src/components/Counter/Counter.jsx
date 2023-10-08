import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../../redux/actions/actions";

function Counter({ initialQuantity, stock, productId, onQuantityChange }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  // const handleQuantityChange = (newQuantity) => {
  //   dispatch(updateCartItemQuantity(productId, newQuantity));
  //   onQuantityChange(newQuantity);
  // };

  const incrementQuantity = () => {
    if (quantity < stock) {
      dispatch(increment());
      onQuantityChange(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decrement());
      onQuantityChange(quantity - 1);
    }
  };

  // useEffect(() => {
  //   setQuantity(initialQuantity);
  // }, [initialQuantity]);

  return (
    <div className={styles.quantityButtonsContainer}>
      <button className={styles.quantityButton} onClick={decrementQuantity}>
        -
      </button>
      <input
        type="text"
        value={quantity}
        className={styles.quantity}
        min="0"
        max={stock}
        readOnly
      />
      <button className={styles.quantityButton} onClick={incrementQuantity}>
        +
      </button>
    </div>
  );
}

Counter.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default Counter;
