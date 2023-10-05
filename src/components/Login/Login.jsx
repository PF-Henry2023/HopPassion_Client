import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate, isButtonDisabled } from "./validate";
import { getUsers, login } from "../../redux/actions/actions";
import { useNavigate } from "react-router";
import style from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cervezaEspumosaLogin from "../../assets/cervezaEspumosaLogin.png";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setData({
      ...userData,
      [field]: value,
    });

    setErrors(
      validate({
        ...userData,
        [field]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userExists = users.find((user) => user.email === userData.email);
    if (userExists) {
      dispatch(login(userData)).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de sesion exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No existen usuarios registrados con ese email!",
      });
      setData({
        email: "",
        password: "",
      });
      return;
    }
  };

  return (
    <Container className={style.container} fluid={true}>
      <NavBar />
      <Row>
        <Col md={6}>
          <img src={cervezaEspumosaLogin} alt="" className="img-fluid" />
        </Col>

        <Col md={6} className="text-left">
          <h2 className="mb-4">Ingresar a mi cuenta</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                value={userData.email}
                type="text"
                placeholder="Ingresa tu correo electrónico"
                onChange={(event) => {
                  handleChange("email", event.target.value);
                }}
                isInvalid={errors.email}
                isValid={userData.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                <div>Controlar el formato del e-mail</div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                value={userData.password}
                type="password"
                placeholder="Ingresa tu contraseña"
                onChange={(event) => {
                  handleChange("password", event.target.value);
                }}
                isInvalid={errors.password}
                isValid={userData.password && !errors.password}
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
              <Button className={style.btn} variant="primary" type="submit">
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
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
