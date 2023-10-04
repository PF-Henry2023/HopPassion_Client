import style from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import imagenRegistro from "../../assets/imagenRegistro.png";


export default function SignUp() {

  return (
    <Container className={style.container} fluid={true}>
    <NavBar />
      <Row className="justify-content-md-center">
        <Col md={6}>
            <img src={imagenRegistro} alt="" className="img-fluid" />
        </Col>

        <Col md={6}>
          <h2 className="mb-4">Registro</h2>
          
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                className={style.formControl}
              />
              <Form.Control.Feedback type="invalid">
                <div>
                  El nombre debe tener al menos dos letras y no puede incluir
                  números.
                </div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                className={style.formControl}
              />
              <Form.Control.Feedback type="invalid">
                <div>
                  El apellido debe tener al menos dos letras y no puede incluir
                  números.
                </div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className={style.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Formato incorrecto de correo electrónico.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dob">
              <Form.Label>Fecha de Nacimiento:</Form.Label>
              <Form.Control
                type="date"
                className={style.formControl}
              />

              <Form.Control.Feedback type="invalid">
                Verifica el formato de la fecha.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Domicilio:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu domicilio"
                className={style.formControl}
              />
              <Form.Control.Feedback type="invalid">
                <div>Ingrese un domicilio válido</div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>País:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu país"
                className={style.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Código Postal:</Form.Label>
              <Form.Control
                type="text"
                className={style.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                type="text"
                className={style.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea tu contraseña"
                className={style.formControl}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña debe contener 6 caracteres o más, una mayúscula y
                un caracter especial.
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className={style.btn}
              variant="primary"
              type="submit"
            >
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}