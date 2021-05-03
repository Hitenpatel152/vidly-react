import {
    FETCH_UPDATE_GENERE_REQUEST,
    FETCH_UPDATE_GENERE_SUCCESS,
    FETCH_UPDATE_GENERE_FAILURE,
    } from '../../types/genere/genere';
    import settings from '../../setting';
    import axios from "axios";

    import { apiToastError, apiToastSuccess } from "../../modules/utils.js";

    export const fetchUpdateGenereRequest = () => ({
        type: FETCH_UPDATE_GENERE_REQUEST,
    });
    
    export const fetchUpdateGenereSuccess = (data) => ({
        type: FETCH_UPDATE_GENERE_SUCCESS,
        data,
    });
    
    export const fetchUpdateGenereFailure = (error) => ({
        type: FETCH_UPDATE_GENERE_FAILURE,
        error,
    });
    
export const fetchUpdateGenere = (formData, id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/genres`;
    dispatch(fetchUpdateGenereRequest());
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };
    
    return axios
        .put(`${apiUrl}/${id}`, formData, config)
        .then((data) => {
           
        apiToastSuccess("Successfully Updated")
        dispatch(fetchUpdateGenereSuccess(data));
        })
        .catch((error) => {
        apiToastError("Unable to Update")
        dispatch(fetchUpdateGenereFailure(error));
    });
};
    