import { useEffect, useState } from "react"
import style from "../CardContainer/CardContainer.module.css"
import {useDispatch, useSelector } from "react-redux";
import { getProducts, getNextProductPage } from "../../redux/actions/actions";
import Card from "../Card/Card";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CardContainer () {
    
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products ? state.products.products : [] )
    const page = useSelector((state) => state.products ? state.products.page : 1)
    const filters = useSelector((state) => state.filters)
    const searchQuery = useSelector((state) => state.query)

    useEffect(()=> {
        dispatch(getProducts(filters, searchQuery))
    }, [filters, searchQuery])

    function handleNextPage() {
        dispatch(getNextProductPage(filters, searchQuery, page))
    }
    
    return (
        <div className={style.container}>
            <div className={style.title}>Cervezas</div>
            <div className={style.subtitle}>Selección de las mejores cervezas</div>
            <InfiniteScroll dataLength={products.length} next={handleNextPage} hasMore={true}>
                <div className={style.gridContainer}>
                {
                    products.map((product) => {
                        return <Card key={product.id} id={product.id} title={product.name} price={product.price} image={product.image}/>
                    })
                }
                </div>
            </InfiniteScroll>
        </div>
    )
}

