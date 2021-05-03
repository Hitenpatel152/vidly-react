import {
    FETCH_DELETE_GENERE_REQUEST,
    FETCH_DELETE_GENERE_SUCCESS,
    FETCH_DELETE_GENERE_FAILURE,
  } from  '../../types/genere/genere';

  import settings from '../../setting';
  import axios from "axios";
  import { apiToastError, apiToastSuccess } from "../../modules/utils.js";
  
  export const fetchDeleteGenereRequest = () => ({
    type: FETCH_DELETE_GENERE_REQUEST,
  });
  
  export const fetchDeleteGenereSuccess = (data) => ({
    type: FETCH_DELETE_GENERE_SUCCESS,
    data,
  });
  
  export const fetchDeleteGenereFailure = (error) => ({
    type: FETCH_DELETE_GENERE_FAILURE,
    error,
  });
  
  export const fetchDeleteGenere = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/genres`;
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };
  
    dispatch(fetchDeleteGenereRequest());
  
    return axios
      .delete( `${apiUrl}/${id}`,config)
      .then((data) => {
        apiToastSuccess("Successfully Deleted")
        dispatch(fetchDeleteGenereSuccess(data));
      })
      .catch((error) => {
         
      apiToastError("Unable to Delete")
      dispatch(fetchDeleteGenereFailure(error));
      });
  };
  