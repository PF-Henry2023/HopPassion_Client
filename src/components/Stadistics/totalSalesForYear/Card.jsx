import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Card.module.css"
import { CurrencyDollar } from "react-bootstrap-icons";

export default function CardTotalAmount() {
  const [total, setTotal] = useState();
  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const cardTotal1 = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/historixalTotalSales"
        );
        setTotal(cardTotal1.data.data);
      } catch (error) {
        throw error;
      }
    };
    getInfoChart();
  }, []);
  console.log("card Total,", total);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.column1}>
        <p>$</p>
      </div>
      <div className={styles.column2}>
        <span className={styles.amount}>{total}</span>
        <span className={styles.span_generic}>Total de ventas</span>
      </div>
    </div>
  );
}

