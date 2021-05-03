import {
FETCH_MOVIES_DETAIL_REQUEST,
FETCH_MOVIES_DETAIL_SUCCESS,
FETCH_MOVIES_DETAIL_FAILURE,
} from '../../types/movie/movie';
import axios from "axios";
import settings from '../../setting';
export const fetchMoviesDetailRequest = () => ({
type: FETCH_MOVIES_DETAIL_REQUEST,
});

export const fetchMoviesDetailSuccess = (data) => ({
type: FETCH_MOVIES_DETAIL_SUCCESS,
data,
});

export const fetchMoviesDetailFailure = (error) => ({
type: FETCH_MOVIES_DETAIL_FAILURE,
error,
});

export const fetchMoviesDetail = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/movie`;
dispatch(fetchMoviesDetailRequest());
const config = {
    headers: {
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
},
};

return axios
    .get(`${apiUrl}/${id}`, config)
    .then((data) => {
    
    dispatch(fetchMoviesDetailSuccess(data));
    })
    .catch((error) => {
    dispatch(fetchMoviesDetailFailure(error));
    });
};
