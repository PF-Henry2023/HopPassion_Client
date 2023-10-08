import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import PaymentStatus from "./PaymentStatus";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");
import { processPayment } from "../../redux/actions/actions";

const PaymentGateway = () => {
  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(paymentId);
  }, [paymentId]);

  const initialization = {
    amount: 100,
    preferenceId: "<PREFERENCE_ID>",
    quantity: 1,
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
  // const onSubmit = async ({ selectedPaymentMethod, formData }) => {
  //   try {
  //     const response = await processPayment(formData);

  //     setPaymentId(response.data.payment_id);

  //     navigate(`/status/${paymentId}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/mercadoPago/process_payment", {
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
            console.log(prevPaymentId); // Esto mostrará el valor actualizado del paymentId.
            navigate(`/status/${prevPaymentId}`);
            resolve();
          });
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
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
    </>
  );
};
export default PaymentGateway;
