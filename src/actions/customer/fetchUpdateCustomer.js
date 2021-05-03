import {
    FETCH_UPDATE_CUSTOMER_REQUEST,
    FETCH_UPDATE_CUSTOMER_SUCCESS,
    FETCH_UPDATE_CUSTOMER_FAILURE,
    } from '../../types/customer/customer';
    import settings from '../../setting';
    import axios from "axios";

    import { apiToastError, apiToastSuccess } from "../../modules/utils.js";

    export const fetchUpdateCustomerRequest = () => ({
        type: FETCH_UPDATE_CUSTOMER_REQUEST,
    });
    
    export const fetchUpdateCustomerSuccess = (data) => ({
        type: FETCH_UPDATE_CUSTOMER_SUCCESS,
        data,
    });
    
    export const fetchUpdateCustomerFailure = (error) => ({
        type: FETCH_UPDATE_CUSTOMER_FAILURE,
        error,
    });
    
export const fetchUpdateCustomer = (formData, id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/customer`;
    dispatch(fetchUpdateCustomerRequest());
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };
    
    return axios
        .put(`${apiUrl}/${id}`, formData, config)
        .then((data) => {
           
        apiToastSuccess("Successfully Updated")
        dispatch(fetchUpdateCustomerSuccess(data));
        })
        .catch((error) => {
        apiToastError("Unable to Update")
        dispatch(fetchUpdateCustomerFailure(error));
    });
};
    