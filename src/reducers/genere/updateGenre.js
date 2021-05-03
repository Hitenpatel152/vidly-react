import {
    FETCH_UPDATE_GENERE_REQUEST,
    FETCH_UPDATE_GENERE_SUCCESS,
    FETCH_UPDATE_GENERE_FAILURE,
    } from '../../types/genere/genere';
    
    const initialState = {
        data: null,
        error: null,
        isLoading: false,
    };
    
const UpdateGenereReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UPDATE_GENERE_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_UPDATE_GENERE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_UPDATE_GENERE_FAILURE:
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
    
    export default UpdateGenereReducer;
    