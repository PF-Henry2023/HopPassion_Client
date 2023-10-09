import { getLoggedInUser } from "./../../utils/UserUtils";
import {
  emptyCart,
  mergeCart,
  setCart,
  startSyncing,
  stopSyncing,
} from "../../utils/CartUtils";
import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  SYNC_AUTH_STATE,
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
  GET_CART,
  GET_CART_REQUEST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  MERCADOPAGO,
  GET_USER_INFO,
} from "../actions/actions-type";

const initialState = {
  user: getLoggedInUser(),
  productDetails: {},
  products: null,
  isLoading: false,
  quantity: 1,
  categories: {},
  filters: {},
  query: null,
  cart: emptyCart(),
  paymentStatus: null,
  userInfo: {},
  orderDetails: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case SYNC_AUTH_STATE:
      return {
        ...state,
        user: action.payload,
      };
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
        isLoading: false,
        quantity: 1,
      };

    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case GET_NEXT_PRODUCT_PAGE: {
      const list = (state.products ? state.products.products : []).concat(
        action.payload.products
      );
      return {
        ...state,
        products: {
          ...action.payload,
          products: list,
        },
      };
    }

    case GET_CART:
      return {
        ...state,
        cart: setCart(state.cart, action.payload),
      };

    case GET_CART_REQUEST:
      return {
        ...state,
        cart: startSyncing(state.cart),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: emptyCart(),
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: mergeCart(state.cart, action.payload),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: mergeCart(state.cart, action.payload),
      };

    case MERCADOPAGO:
      return {
        ...state,
        paymentStatus: "Pago completado",
      };

    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
