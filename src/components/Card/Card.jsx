import React, { useState } from "react";
import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { CartPlus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";

const CardP = ({ id, title, price, image, stock, quantity }) => {
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true)
    axios.put(
      "http://localhost:3001/cart/set",
      { productId: id, quantity: quantity + 1 },
      { headers: { 'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNpbnRpYSIsImxhc3ROYW1lIjoiQ28iLCJyb2xlIjoidXNlciIsImlhdCI6MTY5NjYzODU2NCwiZXhwIjoxNjk2NzI0OTY0fQ.8yoKgOevCCZyzTiIaiMO4LrHYWshnwv9lVuGbwYhcU4'}}
    ).then(response => {
      dispatch(addToCart(response.data))
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    }) 
  };

  function buttonContent() {
    if(isLoading) {
      return <Spinner animation="border" role="status"></Spinner>
    } else if(quantity >= stock) {
      return "Stock agotado"
    } else {
      return <><CartPlus /> Agregar</>
    }
  }

  return (
    <div className={style.container}>
      <Card style={{ width: "255px", height: "450px", border: "none" }}>
        <div className={style.imageWrapper}>
          <Link to={`/product/${id}`} className={style.link}>
            <Card.Img variant="top" src={image} className={style.image} />
          </Link>
        </div>
        <Card.Body>
          <div className={style.infoWrapper}>
            <Card.Title>{title}</Card.Title>
            <div className={style.row}>
                <Card.Text className={style.customTextColor}>
                  ${price}
                </Card.Text>
            </div>
          </div>
        </Card.Body>
        <button
          className={style.button}
          onClick={() => handleAddToCart()}
          disabled={quantity >= stock}
        >
          { buttonContent() }
        </button>
      </Card>
    </div>
  );
};

export default CardP;
