import HopPassionClient from "../../utils/NetworkingUtils";
import {
  handleUserLogin,
  getLoggedInUser,
  handleUserLogout,
} from "../../utils/UserUtils";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  SYNC_AUTH_STATE,
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
  GET_CART,
  GET_CART_REQUEST,
} from "./actions-type";

export const signup = ({ name, lastName, address, email, phone, password }) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signup", {
        name,
        lastName,
        address,
        email,
        phone,
        password,
      });
      if (response.data) {
        handleUserLogin(response.data);
      }
      dispatch({
        type: SIGNUP,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const login = (userData, handleLoginError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signin", userData);
      handleUserLogin(response.data);
      dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleLoginError(error);
    }
  };
};

export const logout = () => {
  handleUserLogout();
  return { type: LOGOUT };
};

export const syncAuthState = () => {
  return { type: SYNC_AUTH_STATE, payload: getLoggedInUser() };
};

export function getProductById(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOADING_PRODUCT });
      const response = await HopPassionClient.get("/product/" + id);
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
      const result = await HopPassionClient.get(
        buildGetProductsUrl(filters, query)
      );
      dispatch({ type: GET_PRODUCTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNextProductPage = (filters, query, page) => {
  return async (dispatch) => {
    try {
      const result = await HopPassionClient.get(
        buildGetProductsUrl(filters, query, page + 1)
      );
      dispatch({ type: GET_NEXT_PRODUCT_PAGE, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const buildGetProductsUrl = (filters, query, page) => {
  let baseUrl = "/product/all?";
  const params = [];

  const addParam = (key, value) => {
    if (value) {
      params.push(`${key}=${encodeURIComponent(value)}`);
    }
  };

  addParam("country", filters.country);
  addParam("order", filters.order ? filters.order.id : null);
  addParam("category", filters.category ? filters.category.id : null);
  addParam("query", query);
  addParam("page", page);

  return baseUrl + params.join("&");
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get("/categories/all");
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
      const response = await HopPassionClient.post("/product/create", {
        name,
        image,
        description,
        country,
        category,
        price,
        stock,
        amountMl,
        alcoholContent,
      });
      return dispatch({
        type: CREATE_PRODUCT,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getCart = () => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get("/cart");
      dispatch({ type: GET_CART, payload: response.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCartRequest = () => {
  return { type: GET_CART_REQUEST };
};

export const addToCart = (id, quantity, callback) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.put("/cart/set", {
        productId: id,
        quantity: quantity,
      });
      dispatch({ type: ADD_TO_CART, payload: response.data });
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false);
    }
  };
};

export const removeFromCart = (id, callback) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.put("/cart/set", {
        productId: id,
        quantity: 0,
      });
      dispatch({ type: REMOVE_FROM_CART, payload: response.data });
      callback(true);
    } catch (error) {
      console.log(error);
      callback(false);
    }
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
