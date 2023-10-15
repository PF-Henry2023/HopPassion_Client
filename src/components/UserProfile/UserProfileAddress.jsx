import { useState, useEffect } from "react";
import styles from "./UserProfile.module.css";
import { mapUserToUserInfo } from "./../../utils/UserUtils"
import HopPassionClient from "../../utils/NetworkingUtils";
import Loading from "../Loading/Loading"
import { useParams } from "react-router-dom";

const UserProfileAddress = () => {
    const { id } = useParams();
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false)
    const [ editableData, setEditableData ] = useState({})
    const [ userData, setUserData ] = useState({
        address: "",
        postalCode: "",
        city: "",
        country: "",
    });

    useEffect(() => {
        getUserInfo()
    }, [])

    async function getUserInfo() {
        setIsLoading(true)
        try {
            const response = await HopPassionClient.get(`/users/${id}`);
            setUserData(mapUserToUserInfo(response.data))
            setIsLoading(false)
        } catch (error) {
            console.error("Error al obtener los datos del usuario", error);
        }
    };

    function handleEditClick(editing) {
        setIsEditing(editing)
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (!["address", "country", "city", "postalCode"].includes(name)) {
            return
        }
        setEditableData({ ...editableData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setIsLoading(true)
            const response = await HopPassionClient.put(`/users/update/${id}`, editableData);
            setUserData({...userData, ...editableData})
            setIsEditing(false)
            setIsLoading(false)
        } catch(error) {
            console.error("Error al actualizar los datos del usuario", error);
            setIsEditing(false)
            setIsLoading(false)
        }
    }

    function drawDefault() {
        return (
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
                onClick={ () => handleEditClick(true) }
                >
                Editar
                </button>
            </>
        )
    }

    function drawLoading() {
        return <Loading />
    }

    function drawEditing() {
        return (
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
                <button
                onClick={() => handleEditClick(false)}
                >
                Cancelar
                </button>
            </>
        )
    }

    function drawComponent() {
        if (isLoading) {
            return drawLoading()
        } else if (isEditing) {
            return drawEditing()
        } else {
            return drawDefault()
        }
    }

    return (
        <>{ drawComponent() }</>
    )
}

export default UserProfileAddress;