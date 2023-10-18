import { useState } from "react";
import style from "./Borrado.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);

  const handleAction = async () => {
    try {
      z;
      if (isDelete) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:3001/product/${id}`);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      } else {
        await axios.post(`http://localhost:3001/product/${id}`);
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
