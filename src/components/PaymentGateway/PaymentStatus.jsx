import { StatusScreen } from "@mercadopago/sdk-react";

export default function StatusPayment(props) {
  const initialization = {
    paymentId: props.idPayment, // id de pago para mostrar
  };
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
