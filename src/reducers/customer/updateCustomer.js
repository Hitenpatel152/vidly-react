import {
    FETCH_UPDATE_CUSTOMER_REQUEST,
    FETCH_UPDATE_CUSTOMER_SUCCESS,
    FETCH_UPDATE_CUSTOMER_FAILURE,
    } from '../../types/customer/customer';
    
    const initialState = {
        data: null,
        error: null,
        isLoading: false,
    };
    
const UpdateCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UPDATE_CUSTOMER_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_UPDATE_CUSTOMER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_UPDATE_CUSTOMER_FAILURE:
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
    
    export default UpdateCustomerReducer;
    