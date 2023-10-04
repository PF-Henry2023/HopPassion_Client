import style from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cervezaEspumosaLogin from "../../assets/cervezaEspumosaLogin.png";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Login() {


  return (
    <Container className={style.container} fluid={true}>
    <NavBar />
      <Row>
        <Col md={6}>
            <img src={cervezaEspumosaLogin} alt="" className="img-fluid" />
        </Col>

        <Col md={6} className="text-left">
          <h2 className="mb-4">Ingresar a mi cuenta</h2>
          <Form>
            <Form.Group className="mb-3" controlId="user">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu correo electrónico"
                // onChange={(event) => {
                //   changeHandler("email", event.target.value);
                // }}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                // onChange={(event) => {
                //   changeHandler("password", event.target.value);
                // }}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe contener 6 caracteres o más, una mayúscula y
                un caracter especial.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              {/* <GoogleLogin
                clientId={clientId}
                isNutritionist={userCredentialsOauth}
              /> */}
              <Button
                className={style.btn}
                variant="primary"
                type="submit"
                // onClick={handleLogin}
              >
                INGRESAR
              </Button>
            </div>
            {/* <div className="d-flex justify-content-end">
                <Button
                  className="my-2"
                  variant="primary"
                  type="submit"
                  onClick={googleLogin}
                >
                  INGRESA CON GOOGLE
                </Button>
              </div>
                */}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Confirmo haber leído los Términos y Condiciones"
            //   onChange={() =>
            //     changeHandler("isNutritionist", !credentials.isNutritionist)
            //   }
            />
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}