import {
    FETCH_RENTAL_DETAIL_REQUEST,
    FETCH_RENTAL_DETAIL_SUCCESS,
    FETCH_RENTAL_DETAIL_FAILURE,
} from '../../types/rental/rental';

const initialState = {
    data: null,
    error: null,
    isLoading: false,
};

const RentalDetailReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_RENTAL_DETAIL_REQUEST:
        return {
        ...state,
        isLoading: true,
        };
    case FETCH_RENTAL_DETAIL_SUCCESS:
        return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
        };
    case FETCH_RENTAL_DETAIL_FAILURE:
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

export default RentalDetailReducer;
