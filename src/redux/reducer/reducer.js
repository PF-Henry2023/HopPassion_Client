import { GET_PRODUCTS_BYID } from "../actions/actions-type";

const initialState = {
  productDetails: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BYID:
      return {
        ...state,
        productDetails: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
