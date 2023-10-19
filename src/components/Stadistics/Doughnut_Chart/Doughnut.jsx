import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Doughnut.module.css";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

function MyDoughnut() {
  const [donut, setDonut] = useState();

  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const donutChart = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/totalUsers"
        );
        setDonut(donutChart.data.data);
      } catch (error) {
        throw error;
      }
    };
    getInfoChart();
  }, []);

  console.log("donut", donut);
  const doughnutOptions = {
    cutout: 38,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10, // Cambia el tamaño de las etiquetas aquí
          },
        },
      },
    }, // Controla el grosor del anillo (ajusta el valor según tus necesidades)
  };

  const data = {
    labels: [],
    datasets: [
      {
        label: "# de Usuarios",
        data: [donut?.desactive, donut?.active],
        backgroundColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <div className={styles.column1}>
        <div className={styles.dona}>
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </div>
      <div className={styles.column2}>
        <span className={styles.totalUsers}>{donut?.totalUsers}</span>
        <span className={styles.span_generic}>Usuarios totales</span>
      </div>
    </div>
  );
}

export default MyDoughnut;
