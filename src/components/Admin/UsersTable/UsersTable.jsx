import { useSelector, useDispatch } from "react-redux";
import style from "./UsersTable.module.css";
import { getUsers, getUserByName } from "../../../redux/actions/actions";
import { useEffect, useState } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [searchName, setSearchName ] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        dispatch(getUsers());
    },[]);

    useEffect(() => {
        // Cargar usuarios activos e inactivos al montar el componente
        fetch(`/users/allUsers`)
          .then((response) => response.json())
          .then((data) => {
            // Dividir los usuarios en listas activas e inactivas
            const activeUserList = data.filter((user) => user.isActive);
            const inactiveUserList = data.filter((user) => !user.isActive);
    
            setActiveUsers(activeUserList);
            setInactiveUsers(inactiveUserList);
          });
      }, []);

    // Calcular la cantidad total de páginas:
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Función para dividir los productos en páginas
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Generar un array de números de página:
    const pageNumbers = [];
    for(let i = 1; i <= totalPages; i++){
        pageNumbers.push(i);
    }
    const activateUser = async (id) => {
        try {
          const currentUser = await HopPassionClient.get(`/users/${id}`);
          const userState = currentUser.data.isActive;
        //   console.log("Estado del usuario activado: ", userState);
    
          if (!userState) {
            await HopPassionClient.put(`/users/activate/${id}`);
            // Actualizar las listas de usuarios
            const updatedInactiveUser = inactiveUsers.filter(
              (user) => user.id !== id
            );
            const userToRestore = inactiveUsers.find((user) => user.id === id);
            setActiveUsers((prevActiveUsers) => [
              ...prevActiveUsers,
              userToRestore,
            ]);
            setInactiveUsers(updatedInactiveUser);
          } else {
            alert("El user esta activado");
          }
        } catch (error) {
          console.error("Error al restaurar el usuario:", error);
        }
      };
    const token = window.localStorage.getItem("token");
    const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`, // Encabezado de autorización con el token JWT
          'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
        },
      };
    const deleteUser = async (id) => {
        try {
          // Eliminar el usuario
          const currentUser = await HopPassionClient.get(`/users/${id}`);
          const userState = currentUser.data.isActive;
        //   console.log("H Estado del usuario eliminado: ", userState);
    
          if (userState) {
            await HopPassionClient.delete(`/users/delete/${id}`, requestOptions);
            // Actualizar las listas de usuarios
            const updatedActiveUser = activeUsers.filter((user) => user.id !== id);
            const userToBlock = activeUsers.find((user) => user.id === id);
            setInactiveUsers((prevInactiveUsers) => [
              ...prevInactiveUsers,
              userToBlock,
            ]);
            setActiveUsers(updatedActiveUser);
          } else {
            alert("El user esta desactivado");
          }
        } catch (error) {
          console.error("Error al bloquear el usuario:", error);
        }
      };

    const handleInput = (event) => { // funcion que setea el searchName, me lo setea a lo que sea el target value del input de busqueda
        event.preventDefault();
        setSearchName(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getUserByName(searchName))
    }
    return (
        <div className={style.container}>
            <div className={style.containerInput}>
                <div className={style.search}>
                    <input placeholder="Buscar usuario..." type="search" onChange={handleInput}/>
                    <button type="submit" onClick={handleSubmit}>Buscar</button>
                </div>

            </div>
            <div className={style.subContainer}>
                <div className={style.info}>
                    <h6>Usuario</h6>
                    <h6>Email</h6>
                    <h6>ID</h6>
                    <h6>Estado</h6>
                </div>
                <div className={style.pagination}>
                    <button onClick={() => setCurrentPage(currentPage -1)}
                    disabled={currentPage === 1}>Ant</button>
                    <div className={style.pageNumbers}>
                    {pageNumbers.map((number) => (
                        <div
                        key={number}
                        className={number === currentPage ? style.activePage : null}
                        onClick={() => setCurrentPage(number)}
                        >
                        {number}
                        </div>
                    ))}
                    </div>
                    <button onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentUsers.length < usersPerPage}>Next</button>
                </div>
            </div>
            <div className={style.containerUsers}>
                {currentUsers.map((user) => {
                    return (
                        <div>
                            <ul key={user.id}>
                                <li className={style.userData}>
                                    <span>{user.name}</span>
                                    <span>{user.email}</span>
                                    <span>{user.id}</span>
                                    <span>{user.isActive ? "Usuario Activo" : "Usuario Inactivo"}</span>
                                    <button 
                                        onClick={user.isActive 
                                        ? (() => deleteUser(user.id)) 
                                        : (() => activateUser(user.id))}
                                    >{user.isActive ? "Desactivar" : "Activar"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    ) 
}

export default UsersTable;