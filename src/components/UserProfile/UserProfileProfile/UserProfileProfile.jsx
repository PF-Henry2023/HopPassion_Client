import { useState, useEffect } from "react";
import styles from "./UserProfileProfile.module.css";
import { mapUserToUserInfo } from "../../../utils/UserUtils";
import HopPassionClient from "../../../utils/NetworkingUtils";
import Loading from "../../Loading/Loading";
import { useParams } from "react-router-dom";
import { udateUserToken, updateUser } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../../utils/UserUtils";

const UserProfileProfile = () => {
  useEffect(() => {
    console.log("este es la info del token actual:");
  }, []);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    phone: "",
    password: "",
  });

  function handleEditClick(editing) {
    setIsEditing(editing);
  }

  useEffect(() => {
    const getInfo = async () => {
      
      await dispatch(getUserInfo(id));
      
    }
    getInfo();
  },[])


  function handleInputChange(event) {
    const { name, value } = event.target;
    if (!["name", "lastName", "phone", "password"].includes(name)) {
      return;
    }
    setEditableData({ ...editableData, [name]: value });
  }

  async function handleSubmit(event) {
    try {
      setIsLoading(true);
      dispatch(updateUser(id, editableData));
      setUserData({ ...userData, ...editableData });
      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al actualizar los datos del usuario", error);
      setIsEditing(false);
      setIsLoading(false);
    }
  }

  function drawDefault() {
    return (
      <>
        <h1>Mi perfil</h1>
        <div className={styles.rowContainer}>
          <div>
            <h4>Nombre</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Apellido</h4>
            <p>{user.lastName}</p>
          </div>
        </div>
        <div className={styles.rowContainer}>
          <div>
            <h4>Contraseña</h4> <p>********</p>
          </div>
          <div>
            <h4>Número de teléfono</h4> <p>{user?.phone}</p>
          </div>
        </div>
        <button
          className={styles.editButton}
          onClick={() => handleEditClick(true)}
        >
          Editar
        </button>
      </>
    );
  }

  function drawLoading() {
    return <Loading />;
  }

  function drawEditing() {
    return (
      <>
        <form onSubmit={handleSubmit} className={styles.updateForm}>
          <div className={styles.rowContainer}>
            <div>
              <h4>Nombre</h4>
              <input type="text" name="name" onChange={handleInputChange} />
            </div>
            <div>
              <h4>Apellido</h4>
              <input type="text" name="lastName" onChange={handleInputChange} />
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div>
              <h4>Contraseña</h4>{" "}
              <input type="text" name="password" onChange={handleInputChange} />
            </div>
            <div>
              <h4>Número de teléfono</h4>{" "}
              <input type="text" name="phone" onChange={handleInputChange} />
            </div>
          </div>
          <input type="submit" value="Guardar" />
          <button onClick={() => handleEditClick(false)}>Cancelar</button>
        </form>
      </>
    );
  }

  function drawComponent() {
    if (isLoading) {
      return drawLoading();
    } else if (isEditing) {
      return drawEditing();
    } else {
      return drawDefault();
    }
  }

  return <>{drawComponent()}</>;
};

export default UserProfileProfile;
