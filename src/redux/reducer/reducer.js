import { GET_PRODUCTS } from "../actions/actions";

const initialState = {
  products: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state, 
        products: action.payload
      }
    }
    default:
      return { ...state };
  }
};

export default rootReducer;
