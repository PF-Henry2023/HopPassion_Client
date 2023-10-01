import { GET_PRODUCTS_BYID, GET_PRODUCTS } from "../actions/actions-type";

const initialState = {
  productDetails: {},
  products: null,
  isLoading: false,
  quantity:1
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
        isLoading: false,
        quantity:1
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
