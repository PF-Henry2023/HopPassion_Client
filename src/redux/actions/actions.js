import axios from "axios";
import { handleUserLogin, getLoggedInUser } from "../../utils/UserUtils";
import {
  GET_USERS,
  SIGNUP,
  LOGIN,
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  LOADING_PRODUCT,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from "./actions-type";

export const getUsers = () => {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/users/allUsers`);
    return dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};

export const signup = ({ name, lastName, address, email, phone, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/users/signup`, {
        name,
        lastName,
        address,
        email,
        phone,
        password,
      });
      const user = response.data;
      console.log(response);
      dispatch({
        type: SIGNUP,
        payload: user,
      });

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const login = ({ email, password }) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/users/signin`, {
        email,
        password,
      });
      if (response.data) {
        handleUserLogin(response.data);
      } else {
        throw Error("Invalid Password");
      }

      dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

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

export const getProducts = (filters, query) => {
  return async (dispatch) => {
    try {
      const result = await axios(buildGetProductsUrl(filters, query));
      dispatch({ type: GET_PRODUCTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNextProductPage = (filters, query, page) => {
  return async (dispatch) => {
    try {
      const result = await axios(buildGetProductsUrl(filters, query, page + 1));
      dispatch({ type: GET_NEXT_PRODUCT_PAGE, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const buildGetProductsUrl = (filters, query, page) => {
  let url = new URL("http://localhost:3001/product/all");
  safeSetParam(url, "country", filters.country);
  safeSetParam(url, "order", filters.order ? filters.order.id : null);
  safeSetParam(url, "category", filters.category ? filters.category.id : null);
  safeSetParam(url, "query", query);
  safeSetParam(url, "page", page);
  return url.toString();
};

function safeSetParam(url, key, value) {
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
}

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/categories/all");
      dispatch({ type: GET_CATEGORIES, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setFilters = (filters) => {
  return { type: SET_FILTERS, payload: filters };
};

export const setSearchQuery = (query) => {
  return { type: SET_SEARCH_QUERY, payload: query };
};

export const createProduct = ({
  name,
  image,
  description,
  country,
  category,
  price,
  stock,
  amountMl,
  alcoholContent,
}) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/product/create`,
        {
          name,
          image,
          description,
          country,
          category,
          price,
          stock,
          amountMl,
          alcoholContent,
        }
      );
      return dispatch({
        type: CREATE_PRODUCT,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const updateCartItemQuantity = (productId, newQuantity) => {
  return {
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: {
      productId,
      newQuantity,
    },
  };
};
