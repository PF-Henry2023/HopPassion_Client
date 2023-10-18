import { useState, useEffect } from "react";
import styles from "./UserProfileProfile.module.css";
import Loading from "../../Loading/Loading";
import { updateUser } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";;
import { validation, isButtonDisabled } from "./validations";

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
  const [errors, setErrors] = useState({});

  function handleEditClick(editing) {
    setIsEditing(editing);
  }

  // useEffect(() => {
  //   const getInfo = async () => {

  //     await dispatch(getUserInfo(id));

  //   }
  //   getInfo();
  // },[])

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (!["name", "lastName", "phone", "password"].includes(name)) {
      return;
    }

    if (value.trim() !== "") {
      const input = { [name]: value };
      const inputErrors = validation(input);

      if (inputErrors[name]) {
        setErrors({ ...errors, [name]: inputErrors[name] });
      } else {
        setErrors({ ...errors, [name]: undefined });
      }
    } else {
      setErrors({ ...errors, [name]: undefined });
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
      <div className={styles.mainContainer}>
        <h1 className={styles.title}>Mi perfil</h1>
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
      </div>
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
              {errors.name && (
                <p className={styles.error}>
                  El nombre debe contener solo letras y tener al menos 2
                  caracteres.
                </p>
              )}
            </div>
            <div>
              <h4>Apellido</h4>
              <input type="text" name="lastName" onChange={handleInputChange} />
              {errors.lastName && (
                <p className={styles.error}>
                  {" "}
                  El apellido debe contener solo letras y tener al menos 2
                  caracteres.
                </p>
              )}
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div>
              <h4>Contraseña</h4>{" "}
              <input type="text" name="password" onChange={handleInputChange} />
              {errors.password && (
                <p className={styles.error}>
                  La contraseña debe tener al menos 8 caracteres y contener al
                  menos una letra mayúscula, una letra minúscula y un número.
                </p>
              )}
            </div>
            <div>
              <h4>Número de teléfono</h4>{" "}
              <input type="text" name="phone" onChange={handleInputChange} />
              {errors.phone && (
                <p className={styles.error}>
                  El número de teléfono debe tener exactamente 10 dígitos
                  numéricos.
                </p>
              )}
            </div>
          </div>
          <input
            className={styles.saveButton}
            type="submit"
            value="Guardar"
            disabled={isButtonDisabled}
          />

          <button
            className={styles.cancelButton}
            onClick={() => handleEditClick(false)}
          >
            Cancelar
          </button>
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
