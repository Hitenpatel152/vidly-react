import {
    FETCH_ADD_CUSTOMER_REQUEST ,FETCH_ADD_CUSTOMER_SUCCESS ,FETCH_ADD_CUSTOMER_FAILURE
} from '../../types/customer/customer';

const initialState = {
    data:null,
    error:null,
    isLoading:false
}

const AddCustomerReducer = (state = initialState,action) => {
    switch(action.type){
        case FETCH_ADD_CUSTOMER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data : action.data.data,
                error:null,
            }
        case FETCH_ADD_CUSTOMER_FAILURE :
            return {
                ...state,
                isLoading: false,
                data : null,
                error: action.error.response,
            }
        default:
            return state;
    }
}
export default AddCustomerReducer;