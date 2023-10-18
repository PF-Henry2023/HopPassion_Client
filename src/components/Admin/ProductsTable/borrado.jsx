import { useState } from "react";
import style from "./Borrado.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import HopPassionClient from "../../../utils/NetworkingUtils";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);

  const handleAction = async () => {
    try {
      if (isDelete) {
        const result = Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        if (result.isConfirmed) {
          await HopPassionClient.delete(`/product/${id}`);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      } else {
        // await HopPassionClient.post(`https://hoppassion-server.1.ie-1.fl0.io/${id}`);
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
