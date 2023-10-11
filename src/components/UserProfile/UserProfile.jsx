import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getUserInfo, updateUser, getCart, getCartRequest } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/UserUtils";
import { createSelector } from "reselect";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [activeOption, setActiveOption] = useState("Perfil");
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const user = getLoggedInUser();
  // const [userOrders, setUserOrders] = useState({});
  const selectCart = (state) => state.cart;
  const selectCartMemoized = createSelector([selectCart], (cart) => cart);

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

  const pendingOrder = useSelector(selectCartMemoized);

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getCart());
  }, []);

  useEffect(() => {
    //   Verificar si el usuario está autenticado y tiene el rol correcto
    if (user.id !== Number(id)) {
      navigate("/");
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

  // useEffect(() => {
  //   if (user.id !== Number(id)) {
  //     navigate("/");
  //     return;
  //   }
  //   const response = dispatch(getCart());
  //   setUserOrders(response.data);
  // }, [dispatch]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //Objeto temporal para almacenar los cambios
    const updatedData = { ...userData, [name]: value };

    if (
      [
        "name",
        "lastName",
        "address",
        "email",
        "phone",
        "password",
        "postalCode",
        "city",
        "country",
      ].includes(name)
    ) {
      updatedData[name] = value;
    }

    setUserData(updatedData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToUpdate = {
      name: userData.name,
      lastName: userData.lastName,
      address: userData.address,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      postalCode: userData.postalCode,
      city: userData.city,
      country: userData.country,
    };
    dispatch(updateUser(id, dataToUpdate))
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error al guardar los cambios del usuario:", error);
      });
  };

  const handleMyOrders = async () => {
    try {
      const response = await dispatch(getCart());
      console.log(response);
      // Verifica si 'data' y 'data.products' existen en la respuesta
      if (response.data && response.data.products) {
        setUserOrders({
          id: response.data.id,
          products: {
            name: response.data.products[0].name, // Puedes ajustar el índice si tienes varios productos
            quantity: response.data.products[0].quantity, // Puedes ajustar el índice si tienes varios productos
          },
          total: response.data.total,
        });
      } else {
        console.error("La respuesta no contiene datos válidos.");
      }
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }

    setActiveOption("Mis compras");
  };


  return (
    <>
      <Navbar />
      {isLoading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.leftContent}>
            <p>Hola,</p>

            <h2>
              {userData.name} {userData.lastName}!
            </h2>
            <hr />

            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeOption === "Perfil" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="#"
                  onClick={() => setActiveOption("Perfil")} // Activa la opción "Perfil"
                >
                  Perfil
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeOption === "Dirección" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => setActiveOption("Dirección")} // Activa la opción "Dirección"
                >
                  Dirección
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeOption === "Mis compras" ? "active" : ""
                  }`}
                  href="#"
                  onClick={handleMyOrders}
                >
                  Mis compras
                </a>
              </li>
            </ul>
            <hr />
          </div>

          <div className={styles.rightContent}>
            {activeOption === "Perfil" && <h1>Perfil</h1>}
            {activeOption === "Dirección" && <h1>Dirección</h1>}
            {activeOption === "Mis compras" && <h1>Mis compras</h1>}

            {activeOption === "Perfil" &&
              (editing ? (
                <>
                  <form onSubmit={handleSubmit} className={styles.updateForm}>
                    <div className={styles.rowContainer}>
                      <div>
                        <h4>Nombre</h4>
                        <input
                          type="text"
                          name="name"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <h4>Apellido</h4>
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <h4>Correo electrónico</h4>{" "}
                    <input
                      type="text"
                      name="email"
                      onChange={handleInputChange}
                    />
                    <div className={styles.rowContainer}>
                      <div>
                        <h4>Contraseña</h4>{" "}
                        <input
                          type="text"
                          name="password"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <h4>Número de teléfono</h4>{" "}
                        <input
                          type="text"
                          name="phone"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <input type="submit" value="Guardar" />
                  </form>
                </>
              ) : (
                <>
                  <div className={styles.rowContainer}>
                    <div>
                      <h4>Nombre</h4>
                      <p>{userData.name}</p>
                    </div>
                    <div>
                      <h4>Apellido</h4>
                      <p>{userData.lastName}</p>
                    </div>
                  </div>
                  <h4>Correo electrónico</h4> <p>{userData.email}</p>
                  <div className={styles.rowContainer}>
                    <div>
                      <h4>Contraseña</h4> <p>********</p>
                    </div>
                    <div>
                      <h4>Número de teléfono</h4> <p>{userData.phone}</p>
                    </div>
                  </div>
                  <button
                    className={styles.editButton}
                    onClick={handleEditClick}
                  >
                    Editar
                  </button>
                </>
              ))}

            {activeOption === "Dirección" &&
              (editing ? (
                <>
                  <form onSubmit={handleSubmit} className={styles.updateForm}>
                    <div className={styles.rowContainer}>
                      <div>
                        <h4>Calle</h4>
                        <input
                          type="text"
                          name="address"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        {/* <h4>Ciudad</h4>
                      <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                      /> */}
                      </div>
                    </div>
                    <h4>Código Postal</h4>{" "}
                    <input
                      type="text"
                      name="postalCode"
                      onChange={handleInputChange}
                    />
                    <div className={styles.rowContainer}>
                      <div>
                        <h4>Ciudad</h4>{" "}
                        <input
                          type="text"
                          name="city"
                          value={userData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <h4>País</h4>{" "}
                        <input
                          type="text"
                          name="country"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* <button className={styles.saveButton} onClick={handleSave}>
                    Guardar
                  </button> */}
                   <input type="submit" value="Guardar" />
                  </form>
                </>
              ) : (
                <>
                  <div className={styles.rowContainer}>
                    <div>
                      <h4>Dirección</h4>
                      <p>{userData.address}</p>
                    </div>
                  </div>
                  <h4>Código Postal</h4> <p>{userData.postalCode}</p>
                  <div className={styles.rowContainer}>
                    <div>
                      <h4>Ciudad</h4> <p>{userData.city}</p>
                    </div>
                    <div>
                      <h4>País</h4> <p>{userData.country}</p>
                    </div>
                  </div>
                  <button
                    className={styles.editButton}
                    onClick={handleEditClick}
                  >
                    Editar
                  </button>
                </>
              ))}
            {activeOption === "Mis compras" &&
              (pendingOrder.products ?? []).map((orderDetail, index) => (
                <div key={orderDetail.id}>
                  {/* Renderizar detalles de la orden, por ejemplo: */}
                  <p>Número de orden: {orderDetail.id}</p>
                  <p>Producto: {orderDetail.name}</p>
                  <p>Cantidad: {orderDetail.quantity}</p>
                  <p>Total: {pendingOrder.total}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default UserProfile;
