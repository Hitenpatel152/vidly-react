import {
FETCH_MOVIES_LIST_REQUEST,
FETCH_MOVIES_LIST_SUCCESS,
FETCH_MOVIES_LIST_FAILURE,
} from '../../types/movie/movie';
import axios from "axios";
import settings from '../../setting';
export const fetchMoviesListRequest = () => ({
type: FETCH_MOVIES_LIST_REQUEST,
});

export const fetchMoviesListSuccess = (data) => ({
type: FETCH_MOVIES_LIST_SUCCESS,
data,
});

export const fetchMoviesListFailure = (error) => ({
type: FETCH_MOVIES_LIST_FAILURE,
error,
});

export const fetchMoviesList = (formData) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/movie`;
const passVal = {
    ...formData,
};

dispatch(fetchMoviesListRequest());

return axios
    .get(`${apiUrl}?isDeleted=false`)
    .then((data) => {
    dispatch(fetchMoviesListSuccess(data));
    })
    .catch((error) => {
    dispatch(fetchMoviesListFailure(error));
    });
};
