import {
  FETCH_DELETE_MOVIES_REQUEST,
  FETCH_DELETE_MOVIES_SUCCESS,
  FETCH_DELETE_MOVIES_FAILURE,
} from '../../types/movie/movie';
import axios from "axios";
import settings from '../../setting';
import { apiToastError, apiToastSuccess } from "../../modules/utils";
// import settings from "../../setting";

export const fetchDeleteMoviesRequest = () => ({
  type: FETCH_DELETE_MOVIES_REQUEST,
});

export const fetchDeleteMoviesSuccess = (data) => ({
  type: FETCH_DELETE_MOVIES_SUCCESS,
  data,
});

export const fetchDeleteMoviesFailure = (error) => ({
  type: FETCH_DELETE_MOVIES_FAILURE,
  error,
});

export const fetchDeleteMovies = (id) => (dispatch) => {
  const apiUrl = `${settings.endPoint}/movie`;
  const config = {
    headers: {
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
},
};

  dispatch(fetchDeleteMoviesRequest());

  return axios
    .delete(
      `${apiUrl}/${id}`,
      config
    )
    .then((data) => {
      apiToastSuccess("Successfully Deleted")
      dispatch(fetchDeleteMoviesSuccess(data));
    })
    .catch((error) => {
    apiToastError("Unable to Delete")
    dispatch(fetchDeleteMoviesFailure(error));
    });
};
