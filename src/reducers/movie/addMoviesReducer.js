import {
FETCH_ADD_MOVIES_REQUEST,
FETCH_ADD_MOVIES_SUCCESS,
FETCH_ADD_MOVIES_FAILURE,
} from '../../types/movie/movie';

const initialState = {
data: null,
error: null,
isLoading: false,
};

const AddMoviesReducer = (state = initialState, action) => {
switch (action.type) {
    case FETCH_ADD_MOVIES_REQUEST:
    return {
        ...state,
        isLoading: true,
    };
    case FETCH_ADD_MOVIES_SUCCESS:
    return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
    };
    case FETCH_ADD_MOVIES_FAILURE:
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

export default AddMoviesReducer;
