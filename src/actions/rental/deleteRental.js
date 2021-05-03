import {
    FETCH_DELETE_RENTAL_REQUEST,
    FETCH_DELETE_RENTAL_SUCCESS,
    FETCH_DELETE_RENTAL_FAILURE,
  } from '../../types/rental/rental';
  import axios from "axios";
  import settings from '../../setting';
  import { apiToastError, apiToastSuccess } from "../../modules/utils";
  // import settings from "../../setting";
  
  export const fetchDeleteRentalRequest = () => ({
    type: FETCH_DELETE_RENTAL_REQUEST,
  });
  
  export const fetchDeleteRentalSuccess = (data) => ({
    type: FETCH_DELETE_RENTAL_SUCCESS,
    data,
  });
  
  export const fetchDeleteRentalFailure = (error) => ({
    type: FETCH_DELETE_RENTAL_FAILURE,
    error,
  });
  
  export const fetchDeleteRental = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/rental`;
    const config = {
      headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
  };
  
    dispatch(fetchDeleteRentalRequest());
  
    return axios
      .delete(
        `${apiUrl}/${id}`,
        config
      )
      .then((data) => {
        apiToastSuccess("Successfully Completed")
        dispatch(fetchDeleteRentalSuccess(data));
      })
      .catch((error) => {
      apiToastError("Unable to Delete")
      dispatch(fetchDeleteRentalFailure(error));
      });
  };
  