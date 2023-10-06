import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UserProfile = () => {
  const [activeOption, setActiveOption] = useState("Perfil");
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "Juan",
    apellido: "Gonzalez",
    correo: "nombreapellido@ejemplo.com",
    fechaNacimiento: "DD/MM/AAAA",
    telefono: "00-000-0000-0000",
  });

  const [addressData, setAddressData] = useState({
    calle: "Nombre de la calle",
    numeracion: "111",
    codigoPostal: "0101",
    ciudad: "Nombre de la ciudad",
    pais: "Nombre del país",
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (activeOption === "Perfil") {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    } else if (activeOption === "Dirección") {
      setAddressData({
        ...addressData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.leftContent}>
          <p>Hola,</p>
          <h2>Nombre de Usuario!</h2>
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
                onClick={() => setActiveOption("Mis compras")}
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
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Nombre</h4>
                    <input
                      type="text"
                      name="nombre"
                      value={profileData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h4>Apellido</h4>
                    <input
                      type="text"
                      name="apellido"
                      value={profileData.apellido}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <h4>Correo electrónico</h4>{" "}
                <input
                  type="text"
                  name="correo"
                  value={profileData.correo}
                  onChange={handleInputChange}
                />
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Fecha de Nacimiento</h4>{" "}
                    <input
                      type="text"
                      name="fechaNacimiento"
                      value={profileData.fechaNacimiento}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h4>Número de teléfono</h4>{" "}
                    <input
                      type="text"
                      name="telefono"
                      value={profileData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button className={styles.saveButton} onClick={handleSaveClick}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Nombre</h4>
                    <p>{profileData.nombre}</p>
                  </div>
                  <div>
                    <h4>Apellido</h4>
                    <p>{profileData.apellido}</p>
                  </div>
                </div>
                <h4>Correo electrónico</h4> <p>{profileData.correo}</p>
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Fecha de Nacimiento</h4>{" "}
                    <p>{profileData.fechaNacimiento}</p>
                  </div>
                  <div>
                    <h4>Número de teléfono</h4> <p>{profileData.telefono}</p>
                  </div>
                </div>
                <button className={styles.editButton} onClick={handleEditClick}>
                  Editar
                </button>
              </>
            ))}
          {activeOption === "Dirección" &&
            (editing ? (
              <>
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Calle</h4>
                    <input
                      type="text"
                      name="calle"
                      value={addressData.calle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h4>Numeración</h4>
                    <input
                      type="text"
                      name="numeracion"
                      value={addressData.numeracion}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <h4>Código Postal</h4>{" "}
                <input
                  type="text"
                  name="codigoPostal"
                  value={addressData.codigoPostal}
                  onChange={handleInputChange}
                />
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Ciudad</h4>{" "}
                    <input
                      type="text"
                      name="ciudad"
                      value={addressData.ciudad}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h4>País</h4>{" "}
                    <input
                      type="text"
                      name="pais"
                      value={addressData.pais}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button className={styles.saveButton} onClick={handleSaveClick}>
                  Guardar
                </button>
              </>
            ) : (
              <>
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Calle</h4>
                    <p>{addressData.calle}</p>
                  </div>
                  <div>
                    <h4>Numeración</h4>
                    <p>{addressData.numeracion}</p>
                  </div>
                </div>
                <h4>Código Postal</h4> <p>{addressData.codigoPostal}</p>
                <div className={styles.rowContainer}>
                  <div>
                    <h4>Ciudad</h4> <p>{addressData.ciudad}</p>
                  </div>
                  <div>
                    <h4>País</h4> <p>{addressData.pais}</p>
                  </div>
                </div>
                <button className={styles.editButton} onClick={handleEditClick}>
                  Editar
                </button>
              </>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
