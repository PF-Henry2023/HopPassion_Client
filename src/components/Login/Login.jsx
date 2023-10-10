import React, { useEffect, useState } from "react";
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
import GoogleLoginOatuh2 from "./GoogleLogin/GoogleLogin";
import { gapi } from "gapi-script";

export default function Login() {
  const clientId = "210577079376-bu8ig0s23lino9stujpaad72hmoaoqdh.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user == null) {
      return;
    }
    navigate("/");
  }, [user]);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({clientId: clientId})
    })
  },[])

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

  function handleLoginError(error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error iniciando sesión, verifica tus credenciales.",
    });
    setData({
      email: "",
      password: "",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userExists = users.find((user) => user.email === userData.email);

    if (userExists) {
      try {
        dispatch(login(userData, handleLoginError));
      } catch (error) {
        alert(error.message);
      }
    } else {
      handleLoginError();
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
              <GoogleLoginOatuh2
                clientId={clientId}
              /> 
              <Button
                className={style.btn}
                variant="primary"
                type="submit"
                disabled={isButtonDisabled(errors, userData)}
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
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
