import React, {useState} from 'react'
import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import StatusPayment from "./StatusPayment";
import { Routes, Route } from "react-router-dom";
initMercadoPago("TEST-806f20f0-c9b7-4160-a09c-60b784d4852d");

const PaymentGateway = () => {
  const [paymentId, setPaymentId] = useState(null);
  const item = {
    id: "item_id",
    title: "Producto de ejemplo",
    description: "Descripción del producto",
    quantity: 1, // Cantidad
    unit_price: 100, // Precio unitario e  n la moneda especificada
  };
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
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch("http://localhost:3001/mercadoPago/process_payment", { //axios
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setPaymentId(response.payment_Id);
          resolve();
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
    window.alert("brick listo");
  };
  return (
    <>
      <Routes>
        <Route
          path="/status"
          element={<StatusPayment   idPayment={1318378355} />} //PaymentStatus
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
