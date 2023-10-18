import { useState } from "react";
import style from "./Borrado.module.css";
import axios from "axios";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);

  const handleAction = async () => {
    try {
      if (isDelete) {
        await axios.delete(`https://hoppassion-server.1.ie-1.fl0.io/product/${id}`);
      } else {
        await axios.post(`https://hoppassion-server.1.ie-1.fl0.io/${id}`);
      }

      setIsDelete(!isDelete);
    } catch (error) {
      console.error(
        `Error al ${isDelete ? "desactivar" : "activar"} el producto: ${error}`
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
