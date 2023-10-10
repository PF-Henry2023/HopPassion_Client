import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate, isButtonDisabled } from "./validate";
import { useNavigate } from "react-router-dom";
import { signup, getUsers } from "../../redux/actions/actions";
import style from "./Signup.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import imagenRegistro from "../../assets/imagenRegistro.png";
import GoogleSingUp from "./GoogleSingUp/GoogleSingUp";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);

  const [userData, setData] = useState({
    name: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState(validate(userData));
  const clientId = "210577079376-bu8ig0s23lino9stujpaad72hmoaoqdh.apps.googleusercontent.com";

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

  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch(signup(userData));
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({clientId: clientId})
    })
  },[])

  return (
    <Container className={style.container} fluid={true}>
      <NavBar />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <img src={imagenRegistro} alt="" className="img-fluid" />
        </Col>

        <Col md={6}>
          <h2 className="mb-4">Registro</h2>
          <GoogleSingUp clientId={clientId}/>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                value={userData.name}
                type="text"
                placeholder="Ingresa tu nombre"
                className={style.formControl}
                onChange={(event) => {
                  handleChange("name", event.target.value);
                }}
                isInvalid={errors.name}
                isValid={userData.name && !errors.name}
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
                value={userData.lastName}
                type="text"
                placeholder="Ingresa tu apellido"
                className={style.formControl}
                onChange={(event) => {
                  handleChange("lastName", event.target.value);
                }}
                isInvalid={errors.lastName}
                isValid={userData.lastName && !errors.lastName}
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
                value={userData.email}
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className={style.formControl}
                onChange={(event) => {
                  handleChange("email", event.target.value);
                }}
                isInvalid={errors.email}
                isValid={userData.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Formato incorrecto de correo electrónico.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Domicilio:</Form.Label>
              <Form.Control
                value={userData.address}
                type="text"
                placeholder="Ingresa tu domicilio"
                className={style.formControl}
                onChange={(event) => {
                  handleChange("address", event.target.value);
                }}
                isInvalid={errors.address}
                isValid={userData.address && !errors.address}
              />
              <Form.Control.Feedback type="invalid">
                <div>Ingrese un domicilio válido</div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefono:</Form.Label>
              <Form.Control
                value={userData.phone}
                type="text"
                placeholder="Ingresa tu domicilio"
                className={style.formControl}
                onChange={(event) => {
                  handleChange("phone", event.target.value);
                }}
                isInvalid={errors.phone}
                isValid={userData.phone && !errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                <div>Ingrese un numero válido</div>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                value={userData.password}
                type="password"
                placeholder="Crea tu contraseña"
                className={style.formControl}
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

            <Button
              className={style.btn}
              variant="primary"
              type="submit"
              disabled={isButtonDisabled(errors, userData)}
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
