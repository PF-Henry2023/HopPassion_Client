import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import styles from "./UserProfile.module.css"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const options = [
    {
        id: "profile",
        title: "Perfil"
    },
    {
        id: "address",
        title: "Dirección"
    },
    {
        id: "orders",
        title: "Mis compras"
    }
]

const UserProfile = () => {

    const [searchParams] = useSearchParams();
    const user = useSelector((state) => state.user)

    const [activeOption, setActiveOption] = useState(mapQueryToTab(searchParams.get("tab")));

    function isLoading() {
        return user == null
    }

    function mapQueryToTab(tab) {
        console.log(tab)
        const r = options.find(o => o.id === tab)?.id ?? "profile";
        console.log(r)
        return r;
    }

    return (
        <div>
            <Navbar />
            {
                isLoading() ?
                <Loading /> :
                <div className={styles.mainContainer}>
                    <div className={styles.leftContent}>
                        <p>Hola,</p>

                        <h2>
                        {user.name} {user.lastName}!
                        </h2>
                        <hr />

                        <ul className="nav flex-column">
                            {
                                options.map((option) => {
                                    return <li key={option.id} className="nav-item">
                                                <a
                                                className={`nav-link ${
                                                    activeOption == option.id ? "active" : ""
                                                }`}
                                                aria-current="page"
                                                href="#"
                                                onClick={() => setActiveOption(option.id)}
                                                >
                                                {option.title}
                                                </a>
                                            </li>
                                })
                            }
                        </ul>
                        <hr />
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default UserProfile;