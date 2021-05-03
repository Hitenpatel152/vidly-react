import {
    FETCH_CUSTOMER_DETAIL_REQUEST,
    FETCH_CUSTOMER_DETAIL_SUCCESS,
    FETCH_CUSTOMER_DETAIL_FAILURE,
    } from '../../types/customer/customer';
    import settings from '../../setting';
    import axios from "axios";
    
    export const fetchCustomerDetailRequest = () => ({
    type: FETCH_CUSTOMER_DETAIL_REQUEST,
    });
    
    export const fetchCustomerDetailSuccess = (data) => ({
    type: FETCH_CUSTOMER_DETAIL_SUCCESS,
    data,
    });
    
    export const fetchCustomerDetailFailure = (error) => ({
    type: FETCH_CUSTOMER_DETAIL_FAILURE,
    error,
    });
    
export const fetchCustomerDetail = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/customer`;
    dispatch(fetchCustomerDetailRequest());
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    
    return axios
        .get(`${apiUrl}/${id}`, config)
        .then((data) => {
           
        dispatch(fetchCustomerDetailSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchCustomerDetailFailure(error));
        });
};
    