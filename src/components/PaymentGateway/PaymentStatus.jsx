import { StatusScreen } from "@mercadopago/sdk-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StatusPayment(props) {
  const navigate = useNavigate();
  const { payment_id } = useParams();
  const [navigateToHome, setNavigateToHome] = useState(false);
  const initialization = {
    paymentId: payment_id, // id de pago para mostrar
  };
  const id = window.localStorage.getItem("id");
  useEffect(() => {
    if (navigateToHome) {
      navigate(`/profile/${id}`);
    }
  }, [navigateToHome]);

  const onError = async (error) => {
    console.log(error);
    setTimeout(() => {
      setNavigateToHome(true);
    }, 3000);
  };
  const onReady = async () => {
    console.log("Pago exitoso");
    setTimeout(() => {
      setNavigateToHome(true);
    }, 3000);
  };

  return (
    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
}
