import { useEffect } from "react"
import style from "../CardContainer/CardContainer.module.css"
import {useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import Card from "../Card/Card"

export default function CardContainer () {
    
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    useEffect(()=> {
        dispatch(getProducts())
    }, [])

    
    return (
        <div className={style.container}>
            <div className={style.title}>Cervezas</div>
            <div className={style.subtitle}>Selección de las mejores cervezas</div>
            <div className={style.gridContainer}>
            {
                products == null ? <></> : products.map((product) => {
                    return <Card title={product.name} price={product.price} image={product.image}/>
                })
            }
             </div>
        </div>
    )
}