import React from "react";
import style from "./Product.module.css";

const Product = ({ id, name, alcoholContent, price, stock}) => {

  return (
    <div className={style.product}>
        <div className={style.dateProduct}>
            <span>{name}</span>
            <span>% {alcoholContent}</span>
            <span>$ {price}</span>
            <span>{stock}</span>
        </div>
    </div>
  );
};

export default Product;

