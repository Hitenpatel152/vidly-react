import {
    FETCH_RENTAL_LIST_REQUEST,
    FETCH_RENTAL_LIST_SUCCESS,
    FETCH_RENTAL_LIST_FAILURE,
    } from '../../types/rental/rental';
    
    const initialState = {
    data: null,
    error: null,
    isLoading: false,
    };
    
    const RentalListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RENTAL_LIST_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_RENTAL_LIST_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_RENTAL_LIST_FAILURE:
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
    
    export default RentalListReducer;
    