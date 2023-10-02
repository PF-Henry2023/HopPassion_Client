import {
  GET_PRODUCTS_BYID,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  GET_CATEGORIES,
} from "../actions/actions-type";

const initialState = {
  productDetails: {},
  products: null,
  isLoading: false,
  categories: {},
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
    default:
      return { ...state };
  }
};

export default rootReducer;
