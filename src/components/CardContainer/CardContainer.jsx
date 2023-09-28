import style from "../CardContainer/CardContainer.module.css"

export default function CardContainer () {
    return (
        <div className={style.container}>
            <div className={style.title}>Cervezas</div>
            <div className={style.subtitle}>Selección de las mejores cervezas</div>
        </div>
    )
}