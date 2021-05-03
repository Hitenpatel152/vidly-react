import {
FETCH_ADD_MOVIES_REQUEST,
FETCH_ADD_MOVIES_SUCCESS,
FETCH_ADD_MOVIES_FAILURE,
} from '../../types/movie/movie';
import axios from "axios";
import { apiToastError, apiToastSuccess } from "../../modules/utils";
import settings from '../../setting';
export const fetchAddMoviesRequest = () => ({
type: FETCH_ADD_MOVIES_REQUEST,
});

export const fetchAddMoviesSuccess = (data) => ({
type: FETCH_ADD_MOVIES_SUCCESS,
data,
});

export const fetchAddMoviesFailure = (error) => ({
type: FETCH_ADD_MOVIES_FAILURE,
error,
});

export const fetchAddMovies = (formData) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/movie`;
dispatch(fetchAddMoviesRequest());
const config = {
    headers: {
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
},
};
return axios
    .post(apiUrl, formData, config)
    .then((data) => {
        
        apiToastSuccess("Movie added Successfully")
    dispatch(fetchAddMoviesSuccess(data));
    })
    .catch((error) => {
    apiToastError(error.response.data.message)
    dispatch(fetchAddMoviesFailure(error));
    });
};
