import {
    FETCH_CUSTOMER_DETAIL_REQUEST,
    FETCH_CUSTOMER_DETAIL_SUCCESS,
    FETCH_CUSTOMER_DETAIL_FAILURE,
} from '../../types/customer/customer';
    

const initialState = {
    data: null,
    error: null,
    isLoading: false,
};

const CustomerDetailReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_CUSTOMER_DETAIL_REQUEST:
        return {
        ...state,
        isLoading: true,
        };
    case FETCH_CUSTOMER_DETAIL_SUCCESS:
        return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
        };
    case FETCH_CUSTOMER_DETAIL_FAILURE:
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

export default CustomerDetailReducer;
