import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  getCart,
  getCartRequest,
} from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import Return from "../Return/Return";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import MercadoPagoComponent from "./MercadoPagoButtom/Buttom";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/UserUtils";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const [isDeleting, setDeleting] = useState([]);
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = getLoggedInUser();
  useEffect(() => {
    if (!user.postalCode && !user.city && !user.country) {
      Swal.fire({
        title: "Faltan datos!!",
        text: "Todavia no proporcionaste tus datos de envio!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Completar datos",
      }).then((result) => {
        if (result.isConfirmed) {
          const id = user.id;
          navigate(`/profile/${id}`);
        } else {
          navigate("/");
        }
      });
    }
  }, []);
  console.log(user);

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
                {cart.quantities[product.id]}
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
