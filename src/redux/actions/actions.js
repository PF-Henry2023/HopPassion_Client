import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const result = await axios("http://localhost:3001/product/all")
            dispatch({ type: GET_PRODUCTS, payload: result.data})
        } catch(error) {
            console.log(error)
        }
    }
}