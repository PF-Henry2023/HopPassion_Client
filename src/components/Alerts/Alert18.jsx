import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Alert18 = () => {
  const navigate = useNavigate();

  const confirmAge = () => {
    Swal.fire({
      title: "¡Acceso permitido!",
      text: "Puedes continuar navegando en nuestro sitio.",
      icon: "success",
    });
    navigate("/"); // Redirige al contenido principal después de la confirmación.
  };

  return (
    <div>
      <h1>Confirmación de Edad</h1>
      <p>Por favor, confirma que eres mayor de 18 años para continuar.</p>
      <button onClick={confirmAge}>Sí, soy mayor.</button>
    </div>
  );
};

export default Alert18;



