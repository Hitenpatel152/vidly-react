import {
FETCH_UPDATE_MOVIES_REQUEST,
FETCH_UPDATE_MOVIES_SUCCESS,
FETCH_UPDATE_MOVIES_FAILURE,
} from '../../types/movie/movie';
import axios from "axios";
import settings from '../../setting';
import { apiToastError, apiToastSuccess } from "../../modules/utils";

export const fetchUpdateMoviesRequest = () => ({
type: FETCH_UPDATE_MOVIES_REQUEST,
});

export const fetchUpdateMoviesSuccess = (data) => ({
type: FETCH_UPDATE_MOVIES_SUCCESS,
data,
});

export const fetchUpdateMoviesFailure = (error) => ({
type: FETCH_UPDATE_MOVIES_FAILURE,
error,
});

export const fetchUpdateMovies = (formData, id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/movie`;
dispatch(fetchUpdateMoviesRequest());
const config = {
    headers: {
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
},
};

return axios
    .put(`${apiUrl}/${id}`, formData, config)
    .then((data) => {
     
    apiToastSuccess("Successfully Updated")
    dispatch(fetchUpdateMoviesSuccess(data));
    })
    .catch((error) => {
    apiToastError("Unable to Update")
    dispatch(fetchUpdateMoviesFailure(error));
    });
};
