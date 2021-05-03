import {
    FETCH_MOVIES_DETAIL_REQUEST,
    FETCH_MOVIES_DETAIL_SUCCESS,
    FETCH_MOVIES_DETAIL_FAILURE,
} from '../../types/movie/movie';

const initialState = {
    data: null,
    error: null,
    isLoading: false,
};

const MoviesDetailReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MOVIES_DETAIL_REQUEST:
        return {
        ...state,
        isLoading: true,
        };
    case FETCH_MOVIES_DETAIL_SUCCESS:
        return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
        };
    case FETCH_MOVIES_DETAIL_FAILURE:
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

export default MoviesDetailReducer;
