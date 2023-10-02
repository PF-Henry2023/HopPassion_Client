import { useEffect, useState } from "react"
import style from "../CardContainer/CardContainer.module.css"
import {useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function CardContainer () {
    
    const dispatch = useDispatch()
    const productsData = useSelector((state) => state.products)
    const filters = useSelector((state) => state.filters)

    useEffect(()=> {
        console.log(filters)
        dispatch(getProducts(filters))
    }, [filters])
    // console.log(productsData.products);

    const [currentPage, setCurrentPage] = useState(1);
    const cervezasPerPage = 12;
    
    const indexLast = currentPage * cervezasPerPage; //calcula el indice del ultimo pokemon.
    const indexFirst = indexLast - cervezasPerPage; //calcula el indice del primer pokemon.
    const currentCervezas = productsData && productsData.products ? productsData.products.slice(indexFirst, indexLast) : [];

    const paginado = (pageNumber) => {// funcion para cambiar la pagina actual.
        setCurrentPage(pageNumber);
    }

    
    return (
        <div className={style.container}>
            <div className={style.title}>Cervezas</div>
            <div className={style.subtitle}>Selección de las mejores cervezas</div>
            <div className={style.gridContainer}>
            {
                currentCervezas == null ? <></> : currentCervezas.map((product) => {
                    return <Card key={product.id} id={product.id} title={product.name} price={product.price} image={product.image}/>
                })
            }
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    cervezasPerPage={cervezasPerPage}
                    allCervezas={productsData && productsData.products ? productsData.products.length : 0}
                    paginado={paginado}
                ></Pagination>
            </div>
        </div>
    )
}

