import { useSelector, useDispatch } from "react-redux";
import style from "./UsersTable.module.css";
import { getUsers } from "../../../redux/actions/actions";
import { useEffect, useState } from "react";

const UsersTable = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        dispatch(getUsers());
    },[]);

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

    return (
        <div className={style.container}>
            <div className={style.subContainer}>
                <div className={style.info}>
                    <h6>Usuario</h6>
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
                                    <span>{user.email}</span>
                                    <span>{user.id}</span>
                                    <span>{user.isActive ? "Activo" : "Inactivo"}</span>
                                    <button>Desactivar</button>
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