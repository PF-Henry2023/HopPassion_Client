import axios from "axios";
import { GET_PRODUCTS_BYID, GET_PRODUCTS, LOADING_PRODUCT } from "./actions-type";

export function getProductById(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOADING_PRODUCT });
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

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const result = await axios("http://localhost:3001/product/all");
      dispatch({ type: GET_PRODUCTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
