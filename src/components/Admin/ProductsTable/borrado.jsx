import { useState } from "react";
import style from "./Borrado.module.css"
import axios from "axios";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);

  const handleAction = async () => {
    try {
      if (isDelete) {
        await axios.delete(`http://localhost:3001/product/${id}`);
      } else {
        await axios.post(`http://localhost:3001/product/${id}`);
      }

      setIsDelete(!isDelete);
    } catch (error) {
      console.error(
        `Error al ${
          isDelete ? "desactivar" : "activar"
        } el producto: ${error}`
      );
    }
  };

  return (
    <div>
   <button
        onClick={handleAction}
        className={isDelete ? style.desactivar : style.activar}
      >
        {isDelete ? "Desactivar" : "Activar"}
      </button>
    </div>
  );
};

export default Borrado;
