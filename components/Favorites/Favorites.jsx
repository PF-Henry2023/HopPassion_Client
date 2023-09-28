import style from "./Favorites.module.css";
import Card from "../Card/CardP"

export default function Favorites() {
    return (
        <div className={style.container}>
            <div className={style.title}>Tentate con las más populares</div>
            <div className={style.subtitle}>Éstas son las favoritas</div>
            <Card />
        </div>
    )
}