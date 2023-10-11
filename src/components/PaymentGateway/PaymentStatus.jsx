import { StatusScreen } from "@mercadopago/sdk-react";
import { useParams } from "react-router";

export default function StatusPayment(props) {
  const { payment_id } = useParams();

  const initialization = {
    paymentId: payment_id, // id de pago para mostrar
  };
  console.log(initialization);
  const onError = async (error) => {
    console.log(error);
  };
  const onReady = async () => {
    console.log("El componente de pago está listo");
  };

  return (
    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
}
