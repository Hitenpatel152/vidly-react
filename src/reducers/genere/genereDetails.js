import {
    FETCH_GENERE_DETAIL_REQUEST,
    FETCH_GENERE_DETAIL_SUCCESS,
    FETCH_GENERE_DETAIL_FAILURE,
} from '../../types/genere/genere';
    

const initialState = {
    data: null,
    error: null,
    isLoading: false,
};

const GenereDetailReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_GENERE_DETAIL_REQUEST:
        return {
        ...state,
        isLoading: true,
        };
    case FETCH_GENERE_DETAIL_SUCCESS:
        return {
        ...state,
        isLoading: false,
        data: action.data.data,
        error: null,
        };
    case FETCH_GENERE_DETAIL_FAILURE:
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

export default GenereDetailReducer;
