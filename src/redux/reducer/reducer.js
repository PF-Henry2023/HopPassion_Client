import { GET_PRODUCTS_BYID, GET_PRODUCTS } from "../actions/actions-type";

const initialState = {
  productDetails: {},
  products: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
      };

    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default rootReducer;
