import axios from "axios";
import { GET_PRODUCTS_BYID } from "./actions-type";

export function getProductById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/product/${id}`);
      const productData = response.data;

      dispatch({
        type: GET_PRODUCTS_BYID,
        payload: productData,
      });
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
    }
  };
}
