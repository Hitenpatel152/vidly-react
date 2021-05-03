import {
    FETCH_ADD_CUSTOMER_REQUEST ,FETCH_ADD_CUSTOMER_SUCCESS ,FETCH_ADD_CUSTOMER_FAILURE
} from '../../types/customer/customer';

import settings from '../../setting';
import axios from 'axios';

import { apiToastError, apiToastSuccess } from "../../modules/utils.js";

export const fetchAddCustomerRequest = () => ({
    type : FETCH_ADD_CUSTOMER_REQUEST,
})


export const fetchAddCustomerSuccess = (data) =>({
    type: FETCH_ADD_CUSTOMER_SUCCESS,
    data,
})


export const fetchAddCustomerFailure = (error) =>({
    type: FETCH_ADD_CUSTOMER_FAILURE,
    error,
})

export const fetchAddCustomer = (formData) => (dispatch) =>{
    const apiUrl = `${settings.endPoint}/customer`;
    dispatch(fetchAddCustomerRequest());

    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };

    return axios
        .post(apiUrl , formData ,config)
        .then((data)=>{
            apiToastSuccess("Customer added Successfully")
            dispatch(fetchAddCustomerSuccess(data));
        }).catch((error)=>{
            apiToastError(error.response.data.message)
            dispatch(fetchAddCustomerFailure(error));
        })
}