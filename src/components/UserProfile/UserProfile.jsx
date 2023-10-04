import React from "react";
import styles from "./UserProfile.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UserProfile = () => {
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
              <a className="nav-link active" aria-current="page" href="#">
                Perfil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dirección
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Mis compras
              </a>
            </li>
          </ul>
          <hr />
        </div>

        <div className={styles.rightContent}>
          <h1>Perfil</h1>
          <div className={styles.rowContainer}>
            <div>
              <h4>Nombre</h4>
              <p>Juan</p>
            </div>
            <div>
              <h4>Apellido</h4>
              <p>Gonzalez</p>
            </div>
          </div>
          <h4>Correo electrónico</h4> <p>nombreapellido@ejemplo.com</p>
          <div className={styles.rowContainer}>
            <div>
              <h4>Fecha de Nacimiento</h4> <p>DD/MM/AAAA</p>
            </div>
            <div>
              <h4>Número de teléfono</h4> <p>00-000-0000-0000</p>
            </div>
          </div>
          <button className={styles.editButton}>Editar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
