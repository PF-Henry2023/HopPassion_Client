import style from "../Alert/Alert.module.css";
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import logo_light from "../../assets/logo_light.png";

function Alerts() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success" style={{ backgroundColor: '#EDF2DB !important' }}>
        <img src={logo_light} alt="" className={style.logoLight} />
        <Alert.Heading style={{ color: 'black' }}>¿Sos mayor de edad?</Alert.Heading>
        <p style={{ color: 'black' }}>
        Al confirmar ser mayor de edad manifiestás tu conformidad con los términos de confidencialidad y el uso de cookies de este sitio web. Para más información, podés consultar nuestros Términos y Condiciones de uso del sitio y nuestra Política de Privacidad.
        Beber con moderación. Prohibida su venta a menores de 18 años
        </p>
        <hr />
        <div className="d-flex justify-content-end">
  <Button
    onClick={() => setShow(false)}
    variant="outline-success"
    className={`custom-button ${style.customButton}`}
  >
    Soy mayor
  </Button>
  <button className={style.button}>Todavía no</button>
</div>
      </Alert>
    </>
  );
}

export default Alerts;