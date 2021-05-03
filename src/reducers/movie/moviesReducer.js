import {
FETCH_MOVIES_LIST_REQUEST,
FETCH_MOVIES_LIST_SUCCESS,
FETCH_MOVIES_LIST_FAILURE,
} from '../../types/movie/movie';

const initialState = {
data: null,
error: null,
isLoading: false,
};

const MoviesListReducer = (state = initialState, action) => {
switch (action.type) {
    case FETCH_MOVIES_LIST_REQUEST:
    return {
        ...state,
        isLoading: true,
    };
    case FETCH_MOVIES_LIST_SUCCESS:
    return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
    };
    case FETCH_MOVIES_LIST_FAILURE:
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

export default MoviesListReducer;
