import {
    FETCH_GENERE_LIST_REQUEST,
    FETCH_GENERE_LIST_SUCCESS,
    FETCH_GENERE_LIST_FAILURE,
    } from '../../types/genere/genere';
    
    const initialState = {
    data: null,
    error: null,
    isLoading: false,
    };
    
    const GenereListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GENERE_LIST_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_GENERE_LIST_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_GENERE_LIST_FAILURE:
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
    
    export default GenereListReducer;
    