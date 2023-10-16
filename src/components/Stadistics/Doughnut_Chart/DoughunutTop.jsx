import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

function TopProducts(){
    const [top, setTop] = useState();
    
    useEffect(() => {
        const getInfoChartt = async () => {
          // eslint-disable-next-line no-useless-catch
          try {
            const donutChartt = await axios.get(
              "http://localhost:3001/stadistics/getTenProduct"
            )
            setTop(donutChartt.data);
          } catch (error) {
            throw error
          }
        }
        getInfoChartt();
      },[])
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
            data: [...top.totalAmount],
            backgroundColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
            borderColor: ["rgba(236, 112, 99 )", "rgba(88, 214, 141)"],
            borderWidth: 1,
          },
        ],
      };
    return(

        <div>
            
            <Doughnut data={data} options={doughnutOptions} />
        </div>
    )

}
export default TopProducts;