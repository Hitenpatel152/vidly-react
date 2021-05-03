import {
    FETCH_ADD_GENERE_REQUEST ,
    FETCH_ADD_GENERE_SUCCESS,
    FETCH_ADD_GENERE_FAILURE,
} from '../../types/genere/genere';
    
const initialState = {
    data: null,
    error: null,
    isLoading: false,
};
    
const AddGenereReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADD_GENERE_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
        case FETCH_ADD_GENERE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.data.data,
            error: null,
        };
        case FETCH_ADD_GENERE_FAILURE:
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
    
export default AddGenereReducer;
    