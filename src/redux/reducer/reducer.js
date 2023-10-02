import {
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  GET_CATEGORIES,
  SET_FILTERS,
  SET_SEARCH_QUERY,
  GET_NEXT_PRODUCT_PAGE,
} from "../actions/actions-type";

const initialState = {
  productDetails: {},
  products: null,
  isLoading: false,
  categories: {},
  filters: {},
  query: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
        isLoading: false,
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
      const list = (state.products ? state.products.products : []).concat(action.payload.products)
      return {
        ...state,
        products: { 
          ...action.payload,
          products: list
        }
      }
    }
    default:
      return { ...state };
  }
};

export default rootReducer;
