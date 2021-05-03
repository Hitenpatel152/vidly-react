import {
    FETCH_RENTAL_LIST_REQUEST,
    FETCH_RENTAL_LIST_SUCCESS,
    FETCH_RENTAL_LIST_FAILURE,
    } from '../../types/rental/rental';
    import axios from "axios";
    import settings from '../../setting';
    export const fetchRentalListRequest = () => ({
    type: FETCH_RENTAL_LIST_REQUEST,
    });
    
    export const fetchRentalListSuccess = (data) => ({
    type: FETCH_RENTAL_LIST_SUCCESS,
    data,
    });
    
    export const fetchRentalListFailure = (error) => ({
    type: FETCH_RENTAL_LIST_FAILURE,
    error,
    });
    
    export const fetchRentalList = (formData) => (dispatch) => {
        const apiUrl = `${settings.endPoint}/rental`;
    const passVal = {
        ...formData,
    };
    const config = {
        headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    dispatch(fetchRentalListRequest());
    
    return axios
        .get(`${apiUrl}?isDeleted=false` ,config)
        .then((data) => {
        dispatch(fetchRentalListSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchRentalListFailure(error));
        });
    };
    