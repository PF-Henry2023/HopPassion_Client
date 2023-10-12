import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Dash, Plus } from "react-bootstrap-icons";
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
    <div className={styles.counter_buttons__container}>
      <div className={styles.counter_buttons__content}>
        <button className={styles.counter_buttons__button} onClick={decrementQuantity}>
          <Dash />
        </button>
        <div className={styles.counter_buttons__text}>
          { quantity }
        </div>
        <button className={styles.counter_buttons__button} onClick={incrementQuantity}>
          <Plus />
        </button>
      </div>
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
