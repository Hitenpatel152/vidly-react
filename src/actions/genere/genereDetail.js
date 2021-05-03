import {
    FETCH_GENERE_DETAIL_REQUEST,
    FETCH_GENERE_DETAIL_SUCCESS,
    FETCH_GENERE_DETAIL_FAILURE,
    } from '../../types/genere/genere';
    import settings from '../../setting';
    import axios from "axios";
    
    export const fetchGenereDetailRequest = () => ({
    type: FETCH_GENERE_DETAIL_REQUEST,
    });
    
    export const fetchGenereDetailSuccess = (data) => ({
    type: FETCH_GENERE_DETAIL_SUCCESS,
    data,
    });
    
    export const fetchGenereDetailFailure = (error) => ({
    type: FETCH_GENERE_DETAIL_FAILURE,
    error,
    });
    
export const fetchGenereDetail = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/genres`;
    dispatch(fetchGenereDetailRequest());
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    };
    
    return axios
        .get(`${apiUrl}/${id}`, config)
        .then((data) => {
           
        dispatch(fetchGenereDetailSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchGenereDetailFailure(error));
        });
};
    