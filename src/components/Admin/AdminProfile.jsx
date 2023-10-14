import styles from "./AdminProfile.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getLoggedInUser } from "../../utils/UserUtils";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, createProduct } from "../../redux/actions/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AreaChart from "../Stadistics/Area_Chart/Areachart";
import MyDoughnut from "../Stadistics/Doughnut_Chart/Doughnut";
import CardTotalAmount from "../Stadistics/totalSalesForYear/card";
import Create from "../Create/Create";
import ProductsTable from "./ProductsTable/ProductsTable";

const AdminProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = getLoggedInUser();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState("Estadisticas");

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",  
    address: "",
    city: "",
    country: "",
    postalCode: "",
    password: "",
  });

  const [productData, setProductData] = useState({
    name: "",
    image: "",
    description: "",
    country: "",
    price: "",
    alcoholContent: "",
    stock: "",
    amountMl: "",
  });

  useEffect(() => {
    if (user.id !== Number(id)) {
      navigate("/adminprofile");
      return;
    }
    const fetchData = async () => {
      try {
        const userDataResponse = await dispatch(
          getUserInfo(id, token, navigate)
        );
        setUserData(userDataResponse);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    if (isLoading && !editing) {
      fetchData();
    }
  }, [dispatch, id, navigate, token, user, isLoading]);

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const dataToUpdate = {
      name: productData.name,
      image: productData.image,
      description: productData.description,
      country: productData.country,
      price: productData.price,
      alcoholContent: productData.alcoholContent,
      stock: productData.stock,
      amountMl: productData.amountMl,
    };
    dispatch(createProduct(dataToUpdate))
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
      });
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <Container >
          <Container className="mainContainer">
            <Row className="mainRow">
              <Col
                lg={4}
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Container className="rigthContainer">
                  <Row>
                    <Col>
                      <p>Hola,</p>
                      <h2>
                        {userData.name} {userData.lastName}!
                      </h2>
                      <hr />
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Estadísticas" ? "active" : ""
                            }`}
                            aria-current="page"
                            href="#"
                            onClick={() => setActiveOption("Estadísticas")}
                          >
                            Estadísticas
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Crear Producto" ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => setActiveOption("Crear Producto")}
                          >
                            Crear Producto
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Productos" ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => setActiveOption("Productos")}
                          >
                            Productos
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Usuarios" ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => setActiveOption("Usuarios")}
                          >
                            Usuarios
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Reseñas" ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => setActiveOption("Reseñas")}
                          >
                            Reseñas
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              activeOption === "Contraseña" ? "active" : ""
                            }`}
                            href="#"
                            onClick={() => setActiveOption("Contraseña")}
                          >
                            Contraseña
                          </a>
                        </li>
                      </ul>
                      <hr />
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col
                lg={8}
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Container className="leftCol">
                  <Row>
                    {activeOption === "Estadísticas" && (
                      <Container>
                        <Row>
                          <Col className="d-flex justify-content-center align-items-center">
                              <CardTotalAmount />              
                          </Col>
                          <Col className="d-flex justify-content-center align-items-center">
                              <MyDoughnut />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="d-flex justify-content-center align-items-center">
                              <AreaChart />
                          </Col>
                          <Col className="d-flex justify-content-center align-items-center">
                              <AreaChart />
                          </Col>
                        </Row>
                      </Container>
                    )}
                    {activeOption === "Crear Producto" && (
                      <h1>Crear Producto</h1>
                    )}
                    {activeOption === "Productos" && <h1>Productos</h1>}
                    {activeOption === "Usuarios" && <h1>Usuarios</h1>}
                    {activeOption === "Reseñas" && <h1>Reseñas</h1>}
                    {activeOption === "Contraseña" && <h1>Contraseña</h1>}

                    {activeOption === "Crear Producto" &&
                      (editing ? (
                        <form
                          onSubmit={handleSubmitProduct}
                          className={styles.updateForm}
                        >
                          <div className={styles.rowContainer}>
                            <div>
                              <label>Nombre:</label>
                              <input
                                type="text"
                                name="name"
                                value={productData.name}
                              />
                            </div>
                          </div>
                        </form>
                      ) : (
                        <></>
                      ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default AdminProfile;
