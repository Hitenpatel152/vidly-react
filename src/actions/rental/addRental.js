import {
    FETCH_ADD_RENTAL_REQUEST,
    FETCH_ADD_RENTAL_SUCCESS,
    FETCH_ADD_RENTAL_FAILURE,
    } from '../../types/rental/rental';
    import axios from "axios";
    import { apiToastError, apiToastSuccess } from "../../modules/utils";
    import settings from '../../setting';
    export const fetchAddRentalRequest = () => ({
    type: FETCH_ADD_RENTAL_REQUEST,
    });
    
    export const fetchAddRentalSuccess = (data) => ({
    type: FETCH_ADD_RENTAL_SUCCESS,
    data,
    });
    
    export const fetchAddRentalFailure = (error) => ({
    type: FETCH_ADD_RENTAL_FAILURE,
    error,
    });
    
    export const fetchAddRental = (formData) => (dispatch) => {
        const apiUrl = `${settings.endPoint}/rental`;
       
    dispatch(fetchAddRentalRequest());
    const config = {
        headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    return axios
        .post(apiUrl, formData, config)
        .then((data) => {
            
            apiToastSuccess("rental added Successfully")
        dispatch(fetchAddRentalSuccess(data));
        })
        .catch((error) => {
        apiToastError(error.response.data.message)
        dispatch(fetchAddRentalFailure(error));
        });
    };
    