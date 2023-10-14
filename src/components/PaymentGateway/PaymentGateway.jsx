import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import styles from "./PaymentGateway.module.css"

initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");

const CardPaymentWrapper = memo((props) => {
  return <CardPayment
    locale="es-AR"
    initialization={{
      amount: props.total
    }}
    customization={{
      visual: {
        hidePaymentButton: true
      }
    }}
    onReady={props.onReady}
    onSubmit={props.onSubmit}
    onError={props.onError}
  />
}, (prev, next) => {
  return prev.total == next.total
})

const PaymentGateway = () => {
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);

  const [ isMPReady, setIsMPReady ] = useState(false)

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    /*return new Promise((resolve, reject) => {
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
    });*/
  };

  function drawPaymentComponent() {
    if (syncing || !cart.total) {
      return <Loading />
    } else {
      return (
        <div>
          <CardPaymentWrapper
            total={cart.total}
            onReady={onReady}
            onSubmit={onSubmit}
            onError={onError}
          />
          { isMPReady ? <button className={styles.payButton}>Pagar ${cart.total}</button> : <></> }
        </div>
      )
    }
  }

  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {
    setIsMPReady(true)
  }

  return (
    <>
      <Navbar />
      { drawPaymentComponent() }
      <Footer />
    </>
  );
};

export default PaymentGateway;
