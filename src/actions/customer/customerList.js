import {
    FETCH_CUSTOMER_LIST_REQUEST,
    FETCH_CUSTOMER_LIST_SUCCESS,
    FETCH_CUSTOMER_LIST_FAILURE,
    } from '../../types/customer/customer';
    import settings from '../../setting';
    import axios from "axios";
    
    export const fetchCustomerListRequest = () => ({
    type: FETCH_CUSTOMER_LIST_REQUEST,
    });
    
    export const fetchCustomerListSuccess = (data) => ({
    type: FETCH_CUSTOMER_LIST_SUCCESS,
    data,
    });
    
    export const fetchCustomerListFailure = (error) => ({
    type: FETCH_CUSTOMER_LIST_FAILURE,
    error,
    });
    
    export const fetchCustomerList = () => (dispatch) => {
    const apiUrl = `${settings.endPoint}/customer`;
    
    
    dispatch(fetchCustomerListRequest());
    
    return axios
        .get(`${apiUrl}?isDeleted=false`)
        .then((data) => {
           
        dispatch(fetchCustomerListSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchCustomerListFailure(error));
        });
    };
    