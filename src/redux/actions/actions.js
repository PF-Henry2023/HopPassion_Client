import axios from "axios";
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
  GET_USERS,
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
  GET_USER_INFO,
  UPDATE_CART_TOTAL,
  UPDATE_USER,
  GET_REVIEWS,
} from "./actions-type";
import { Alert } from "react-bootstrap";

export const getReviews = (idProd, idUsuario) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.get(
        `/review/list?idProd=${idProd}&idUsuario=${idUsuario}`
      );
      return dispatch({
        type: GET_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      Alert(error.message);
      console.log(error.message);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.get(`/users/allUsers`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      Alert(error.message);
      console.log(error.message);
    }
  };
};

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
      handleUserLogin(response.data);
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
      handleUserLogin(response.data.token);
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
      console.log(buildGetProductsUrl(filters, query));
      try {
        const result = await HopPassionClient.get(
          buildGetProductsUrl(filters, query)
        );
        dispatch({ type: GET_PRODUCTS, payload: result.data });
      } catch (error) {
        console.log("no se encontraron coincidencias");
      }
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
      await HopPassionClient.post("/product/create", {
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
      console.log(response);
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

export const signupOauth2 = (userGoogleToken, handleSignupError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/signup/oauth2.0", {
        tokenId: userGoogleToken,
      });

      handleUserLogin(response.data.message);

      return dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleSignupError(error);
    }
  };
};

export const loginOauth = (userCredentials, handleLoginError) => {
  return async function (dispatch) {
    try {
      const response = await HopPassionClient.post("/users/login/oauth2.0", {
        tokenId: userCredentials,
      });

      handleUserLogin(response.data.token);

      return dispatch({
        type: LOGIN,
        payload: getLoggedInUser(),
      });
    } catch (error) {
      handleLoginError();
    }
  };
};

export const getUserInfo = (id, token, navigate) => {
  return async (dispatch) => {
    try {
      const response = await HopPassionClient.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const userData = {
          name: response.data.name || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          city: response.data.city || "",
          country: response.data.country || "",
          postalCode: response.data.postalCode || "",
          password: response.data.password || "",
        };

        dispatch({
          type: GET_USER_INFO,
          payload: userData,
        });

        return userData;
      } else if (response.status === 401) {
        navigate("/login");
      } else if (response.status === 403) {
        navigate(`/profile/${id}`);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
    }
  };
};

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      if (!userData) {
        console.error("Los datos del usuario son inválidos.");
        return;
      }

      console.log("Datos a enviar:", userData);

      const response = await HopPassionClient.put(
        `/users/update/${id}`,
        userData
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        dispatch({ type: UPDATE_USER, payload: response.data });
        return response.data;
      } else {
        console.error("Error al actualizar el usuario:", response);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };
};

// export const getUserOrders = (id, token, navigate) => {
//   return async (dispatch) => {
//     try {
//       const response = await HopPassionClient.get("/cart/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {

//         dispatch({
//           type: GET_USER_ORDERS,
//           payload: response,
//         });

//         return response.data;
//       } else if (response.status === 401) {
//         navigate("/login");
//       } else if (response.status === 403) {
//         navigate(`/profile/${id}`);
//       }
//     } catch (error) {
//       console.error("Error al obtener las ordenes del usuario", error);
//     }
//   };
// };

export const updateCartTotal = (newTotal) => {
  return {
    type: UPDATE_CART_TOTAL,
    payload: newTotal,
  };
};

export const processPayment = async (formData) => {
  try {
    const response = await axios.post("/process_payment", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    throw error;
  }
};
