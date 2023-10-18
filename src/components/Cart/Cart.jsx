import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  getCartRequest,
} from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import Return from "../Return/Return";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import MercadoPagoComponent from "./MercadoPagoButtom/Buttom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartRow from "./CartRow";

const Cart = () => {
  const dispatch = useDispatch();
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getCart());
  }, []);

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
              <CartRow key={product.id} initialQuantity={cart.quantities[product.id]} product={product} syncing={syncing}/>
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
