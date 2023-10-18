import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  getCart,
  getCartRequest,
  addToCart,
} from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import Return from "../Return/Return";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import MercadoPagoComponent from "./MercadoPagoButtom/Buttom";
import TimedCounter from "../Counter/TimedCounter";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [isDeleting, setDeleting] = useState([]);
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [ updating, setUpdating ] = useState({})

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getCart());
  }, []);

  const handleRemoveFromCart = (productId) => {
    const deleting = [...isDeleting];
    deleting.push(productId);
    setDeleting(deleting);
    const productToRemove = cart.products.find(
      (product) => product.id === productId
    );
    if (!productToRemove) {
      alert("El producto no se encuentra en el carrito");
      return;
    }
    dispatch(removeFromCart(productId, (result) => {}));
  };

  const isLoading = (productId) => {
    return isDeleting.includes(productId) || syncing;
  };

  function deleteButtonContent(productId) {
    if (isLoading(productId)) {
      return <Spinner animation="border" role="status"></Spinner>;
    } else {
      return "Eliminar";
    }
  }

  function handleQuantityChange(productId, newQuantity) {
    const u = { ...updating }
    u[productId] = true
    setUpdating(u)
    dispatch(addToCart(productId, newQuantity, (result) => {
      const u = { ...updating }
      u[productId] = false
      setUpdating(u)
    }))
    console.log(`id: ${productId}, new quantity: ${newQuantity}`)
  }

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.cartTitle}>
        <Return />
        <h1 className={styles.title}>Mi carrito</h1>
      </div>
      {syncing ? (
        <Loading />
      ) : (
        <div className={styles.cartContainer}>
          {/* Columna 1 */}
          <div className={styles.column}></div>

          {/* Columna 2 */}
          <div className={styles.column}>
            {/* Subtítulos en la segunda fila */}
            <div className={styles.subtitles}>
              <div className={styles.subtitleProduct}>Producto</div>
              <div className={styles.subtitlePrice}>Precio unitario</div>
              <div className={styles.subtitleQuantity}>Cantidad</div>
              <div className={styles.subtitle}></div>{" "}
              {/* Espacio para el botón de eliminar */}
            </div>

            {/* Lista de productos */}
            {(cart.products ?? []).map((product) => (
              <div key={product.id} className={styles.cartItem}>
                <div className={styles.productGroup}>
                  <img
                    src={product.image}
                    className={styles.cartItemImage}
                    alt={`${product.id}`}
                  />
                  <div className={styles.cartItemName}>{product.name}</div>
                </div>
                <p className={styles.cartItemPrice}>$ {product.price}</p>
                {/* <Counter
                productId={product.id}
                initialQuantity={product.quantity}
                stock={product.stock}
                onQuantityChange={(newQuantity) => {}}
              /> */}
                {/* cart.quantities[product.id] */}
                <TimedCounter
                initialQuantity={cart.quantities[product.id]}
                productId={product.id}
                stock={product.stock}
                loading={updating[product.id]}
                onQuantityChange={(nq) => handleQuantityChange(product.id, nq)}
                />
                <button
                  className={styles.cartItemButton}
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  {deleteButtonContent(product.id)}
                </button>
              </div>
            ))}
          </div>

          {/* Columna 3 */}
          <div className={styles.column}>
            <div className={styles.resume}>
              <div className={styles.subtotal}>
                <div>Subtotal</div>
                <div>$ {cart.total}</div>
              </div>
              <div className={styles.divider}></div>

              {/* <div className={styles.gastosEnvio}>
            <div>Gastos de envío</div>
            <div>$500</div>
          </div>
          <div className={styles.divider}></div>*/}

              <div className={styles.total}>
                <div>Total</div>
                <div>$ {cart.total}</div>
              </div>
              <div className={styles.buttons}>
                <Link to="/payment/start">
                  <MercadoPagoComponent total={cart.total} />
                </Link>
                <button onClick={handleNavigate} className={styles.btn}>
                  Elegir más productos
                </button>
                {/* <button onClick={handleClearCart}>Vaciar Carrito</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
