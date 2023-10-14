import { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import styles from "./PaymentGateway.module.css"
import { getCart, getCartRequest } from "../../redux/actions/actions";
import HopPassionClient from "../../utils/NetworkingUtils";
import { useNavigate } from "react-router-dom";

initMercadoPago("TEST-d6e941ef-25e7-4238-99b1-6225487dd3b5");

const CardPaymentWrapper = memo((props) => {
  return <CardPayment
    locale="es-AR"
    initialization={{
      amount: props.total,
      payer: {
        email: props.payerEmail
      }
    }}
    customization={{
      visual: {
        hidePaymentButton: true
      },
      paymentMethods: {
        maxInstallments: 1
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);

  const [ isMPReady, setIsMPReady ] = useState(false)

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getCart());
  }, []);

  function drawPaymentComponent() {
    if (syncing || !cart.total) {
      return <Loading />
    } else {
      return (
        <div>
          <CardPaymentWrapper
            total={cart.total}
            payerEmail={user.email}
            onReady={onReady}
            onError={onError}
          />
          { isMPReady 
          ? <button className={styles.payButton} onClick={handlePayButton}>
              Pagar ${cart.total}
            </button> 
          : <></> }
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

  async function handlePayButton() {
    try {
      const data = await window.cardPaymentBrickController.getFormData()
      const response = await HopPassionClient.post("/pay/process_payment", data);
      navigate('/payment/result?payment_id=' + response.data.payment_id);
    } catch(error) {
      console.log(error)
    }
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