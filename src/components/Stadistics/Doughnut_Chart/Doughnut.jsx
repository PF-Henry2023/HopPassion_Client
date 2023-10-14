import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import "./Doughnut.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function MyDoughnut() {
  const [users, setUsers] = useState([0, 0]);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3001/stadistics/totalUsers").then((reponse) => {
      const { active, desactive, totalUsers } = reponse.data.data;
      setUsers([desactive, active]);
      setTotalUsers(totalUsers);
    });
  }, []);

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
        data: users,
        backgroundColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="containerStyle">
      <div className="containerFlex">
        <div className="userTotal">
          <img
            src="https://res.cloudinary.com/dkwvnp3ut/image/upload/v1697227013/user_zyjpeq.png"
            alt=""
          />
          <span>Usuarios totales</span>
          <span className="totalUsers">{totalUsers}</span>
        </div>
        <div className="dona">
          <Doughnut data={data} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}

export default MyDoughnut;
