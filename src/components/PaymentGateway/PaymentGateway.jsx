import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import PaymentStatus from "./PaymentStatus";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { totalQuantities } from "../../utils/CartUtils";
import styles from "./PaymentGateway.module.css";
// import image from "../../assets/imageBackground.png";

const PaymentGateway = () => {
  /* const { amountTotal, quantities } = props; */
  const [paymentId, setPaymentId] = useState(null);
  const cart = useSelector(e => e.cart);
  const navigate = useNavigate();

  const initialization = {
    amount: cart.total,
    preferenceId: "<PREFERENCE_ID>",
    quantity: totalQuantities(cart.quantities),
  };

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
      fetch(
        "https://hoppassionserver-production.up.railway.app/mercadoPago/process_payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
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
