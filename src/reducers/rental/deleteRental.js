import {
    FETCH_DELETE_RENTAL_REQUEST,
    FETCH_DELETE_RENTAL_SUCCESS,
    FETCH_DELETE_RENTAL_FAILURE,
  } from '../../types/rental/rental';
  
  const initialState = {
    data: null,
    error: null,
    isLoading: false,
  };
  
  const DeleteRentalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DELETE_RENTAL_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_DELETE_RENTAL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.data.data,
          error: null,
        };
      case FETCH_DELETE_RENTAL_FAILURE:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.error.response,
        };
      default:
        return state;
    }
  };
  
  export default DeleteRentalReducer;
  