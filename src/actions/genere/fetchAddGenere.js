import {
    FETCH_ADD_GENERE_REQUEST,
    FETCH_ADD_GENERE_SUCCESS,
    FETCH_ADD_GENERE_FAILURE,
    } from '../../types/genere/genere';

    import settings from '../../setting';
    import axios from "axios";

    import { apiToastError, apiToastSuccess } from "../../modules/utils.js";
    
    export const fetchAddGenereRequest = () => ({
    type: FETCH_ADD_GENERE_REQUEST,
    });
    
    export const fetchAddGenereSuccess = (data) => ({
    type: FETCH_ADD_GENERE_SUCCESS,
    data,
    });
    
    export const fetchAddGenereFailure = (error) => ({
    type: FETCH_ADD_GENERE_FAILURE,
    error,
    });
    
export const fetchAddGenere = (formData) => (dispatch) => {
  
    const apiUrl = `${settings.endPoint}/genres`;
    dispatch(fetchAddGenereRequest());
    const config = {
        headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    
    return axios
        .post(apiUrl, formData, config)
        .then((data) => {
           
            apiToastSuccess("Genere added Successfully")
            dispatch(fetchAddGenereSuccess(data));
        })
        .catch((error) => {
           
            apiToastError(error.response.data.message)
            dispatch(fetchAddGenereFailure(error));
        });
    };
    