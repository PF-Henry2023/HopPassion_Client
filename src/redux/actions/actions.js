import axios from "axios";
import {
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  LOADING_PRODUCT,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
} from "./actions-type";

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
  safeSetParam(url, "country", filters.country)
  safeSetParam(url, "order", filters.order ? filters.order.id : null)
  safeSetParam(url, "category", filters.category ? filters.category.id : null)
  safeSetParam(url, "query", query)
  safeSetParam(url, "page", page)
  return url.toString()
}

function safeSetParam(url, key, value) {
  if(value) {
    url.searchParams.set(key, value)
  } else {
    url.searchParams.delete(key)
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
  return { type: SET_FILTERS, payload: filters}
}

export const setSearchQuery = (query) => {
  return { type: SET_SEARCH_QUERY, payload: query }
}

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
  console.log(image);
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
      console.log(response);
      alert("Producto creado exitosamente");
      return dispatch({
        type: CREATE_PRODUCT,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};
