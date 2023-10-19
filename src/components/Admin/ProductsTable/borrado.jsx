import { useState } from "react";
import style from "./Borrado.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Borrado = ({ id }) => {
  const [isDelete, setIsDelete] = useState(true);
  useEffect(() => {
    const petition = async () => {
      const response = await axios.get(`https://hoppassion-server.1.ie-1.fl0.io/product/${id}`)
      console.log("estado del producto",response);
      if(response.data.isDeleted) {
        setIsDelete(true);
      } else {
        setIsDelete(false);
      }
    }
    petition();
  })

  const handleAction = async () => {
    try {
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
            axios.delete(`https://hoppassion-server.1.ie-1.fl0.io/product/${id}`)
            .then((response) => {
              if(response.status === 200){

              }
            })
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });

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
