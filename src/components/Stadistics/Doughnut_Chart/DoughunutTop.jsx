import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./DoughunutTop.module.css";
import axios from "axios";

function TopProducts() {
  const [top, setTop] = useState();

  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const donutChart = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/getTenProduct"
        );
        setTop(donutChart.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInfoChart();
  }, []);

  const doughnutOptions = {
    cutout: 60, // Aumenta este valor para hacer el agujero más grueso
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const data = {
    labels: top?.labels,
    datasets: [
      {
        label: "unidades vendidas",
        data: top?.totalAmount,
        backgroundColor: [
          "rgba(236, 112, 99)",
          "rgba(88, 214, 141)",
          "rgb(58, 189, 224)",
          "rgb(202, 120, 232)",
          "rgb(247, 247, 99)",
          "rgb(249, 165, 100)",
          "rgb(141, 232, 217)",
          "rgb(146, 141, 232)",
          "rgb(232, 132, 178)",
          "rgb(234, 203, 145)",
        ],
        borderColor: [
          "rgba(236, 112, 99)",
          "rgba(88, 214, 141)",
          "rgb(58, 189, 224)",
          "rgb(202, 120, 232)",
          "rgb(247, 247, 99)",
          "rgb(249, 165, 100)",
          "rgb(141, 232, 217)",
          "rgb(146, 141, 232)",
          "rgb(232, 132, 178)",
          "rgb(234, 203, 145)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Productos más vendidos</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.labels}>
          {top?.labels.map((label, i) => (
            <h3 key={i}>{label}</h3>
          ))}
        </div>
        <div className={styles.colors}>
          {data.labels?.map((label, i) => (
            <div
              key={i}
              className={styles.color}
              style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            ></div>
          ))}
        </div>
        <div className={styles.chartContainer}>
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
