import {
    FETCH_CUSTOMER_LIST_REQUEST,
    FETCH_CUSTOMER_LIST_SUCCESS,
    FETCH_CUSTOMER_LIST_FAILURE,
    } from '../../types/customer/customer';
    
    const initialState = {
    data: null,
    error: null,
    isLoading: false,
    };
    
    const CustomerListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_LIST_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_CUSTOMER_LIST_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_CUSTOMER_LIST_FAILURE:
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
    
    export default CustomerListReducer;
    