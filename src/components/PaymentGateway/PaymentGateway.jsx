import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import PaymentStatus from "./PaymentStatus";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");
import {
  processPayment,
} from "../../redux/actions/actions";


const PaymentGateway = () => {
  const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();

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
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    try {
      const response = await processPayment(formData);

      console.log(response.data);
      setPaymentId(response.data.payment_Id);

      navigate(`/status?idPayment=${response.data.payment_Id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onError = async (error) => {
    console.log(error);
  };
  const onReady = async () => {
    window.alert("brick listo");
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
