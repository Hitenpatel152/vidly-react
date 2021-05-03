import {
    FETCH_RENTAL_DETAIL_REQUEST,
    FETCH_RENTAL_DETAIL_SUCCESS,
    FETCH_RENTAL_DETAIL_FAILURE,
    } from '../../types/rental/rental';
    import axios from "axios";
    import settings from '../../setting';
    export const fetchRentalDetailRequest = () => ({
    type: FETCH_RENTAL_DETAIL_REQUEST,
    });
    
    export const fetchRentalDetailSuccess = (data) => ({
    type: FETCH_RENTAL_DETAIL_SUCCESS,
    data,
    });
    
    export const fetchRentalDetailFailure = (error) => ({
    type: FETCH_RENTAL_DETAIL_FAILURE,
    error,
    });
    
    export const fetchRentalDetail = (id) => (dispatch) => {
        const apiUrl = `${settings.endPoint}/rental`;
    dispatch(fetchRentalDetailRequest());
    const config = {
        headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    
    return axios
        .get(`${apiUrl}/${id}`, config)
        .then((data) => {
        
        dispatch(fetchRentalDetailSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchRentalDetailFailure(error));
        });
    };
    