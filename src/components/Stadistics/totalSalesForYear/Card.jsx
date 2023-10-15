import { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";

export default function CardTotalAmount() {
  const [ total, setTotal ] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/stadistics/historixalTotalSales")
    .then((response) => {
      const { data } = response.data;
      setTotal(data);
    })
  }, [])
  return (
    <div className="containerCard">
      <img
        src="https://res.cloudinary.com/dkwvnp3ut/image/upload/v1697244833/pila-de-billetes-de-dolar_bez69k.png"
        alt="Dolar"
      />
      <div className="container_strings">
        <span className="amount">$| { total }</span>
        <span className="span_generic">Total de ventas</span>
      </div>
    </div>
  );
}
