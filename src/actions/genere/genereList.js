import {
    FETCH_GENERE_LIST_REQUEST,
    FETCH_GENERE_LIST_SUCCESS,
    FETCH_GENERE_LIST_FAILURE,
    } from '../../types/genere/genere';
    import settings from '../../setting';
    import axios from "axios";
    
    export const fetchGenereListRequest = () => ({
    type: FETCH_GENERE_LIST_REQUEST,
    });
    
    export const fetchGenereListSuccess = (data) => ({
    type: FETCH_GENERE_LIST_SUCCESS,
    data,
    });
    
    export const fetchGenereListFailure = (error) => ({
    type: FETCH_GENERE_LIST_FAILURE,
    error,
    });
    
    export const fetchGenereList = () => (dispatch) => {
    const apiUrl = `${settings.endPoint}/genres`;
    
    console.log(apiUrl);
    dispatch(fetchGenereListRequest());
    
    return axios
        .get(`${apiUrl}?isDeleted=false`)
        .then((data) => {
           
        dispatch(fetchGenereListSuccess(data));
        })
        .catch((error) => {
        dispatch(fetchGenereListFailure(error));
        });
    };
    