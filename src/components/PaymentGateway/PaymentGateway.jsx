import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import PaymentStatus from "./PaymentStatus";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");
import { getCart, getCartRequest } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import image from "../../assets/imageBackground.png";
import styles from "./PaymentGateway.module.css";

const PaymentGateway = () => {
  const dispatch = useDispatch();
  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [initialization, setInitialization] = useState({
    amount: 0,
    preferenceId: "<PREFERENCE_ID>",
    quantity: 1,
  });

  console.log(cart);

  

  useEffect(() => {
    dispatch(getCartRequest());

    dispatch(getCart());
    const cartData = cart;
    const total = cartData.total;
    const quantities = cart.quantities;
    const quantity = Object.values(quantities).reduce(
      (accumulator, value) => accumulator + value,
      0
    );
  
    setInitialization({
      amount: Number(total),
      preferenceId: "<PREFERENCE_ID>",
      quantity: quantity,
    });
  
  }, [paymentId]);


  // const initialization = {
  //   amount: 100,
  //   preferenceId: "<PREFERENCE_ID>",
  //   quantity: 1,
  // };

  const customization = {
    paymentMethods: {
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      bankTransfer: "all",
      atm: "all",
      onboarding_credits: "all",
      wallet_purchase: "all",
      maxInstallments: 1,
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("https://hoppassionserver-production.up.railway.app/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setPaymentId(response.payment_id);
          // Utiliza la función de devolución de llamada para realizar acciones después de la actualización del estado.
          setPaymentId((prevPaymentId) => {
            navigate(`/status/${prevPaymentId}`);
            resolve();
          });
        })
        .catch((error) => {
          reject();
        });
    });
  };

  const onError = async (error) => {
    console.log(error);
  };
  const onReady = async () => {
    //window.alert("brick listo"); // Loader
  };
  return (
    <>
    <div>
     <Navbar />
     {/* </div>
     <img className={styles.image} src={image}/>
     <div> */}
      <Routes>
        <Route
          path="/status"
          element={<PaymentStatus idPayment={paymentId} />}
        ></Route>
      </Routes>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
      </div>
      <div>
      <Footer />
      </div>
    </>
  );
};
export default PaymentGateway;

//redigir
