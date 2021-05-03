import {
    FETCH_DELETE_CUSTOMER_REQUEST,
    FETCH_DELETE_CUSTOMER_SUCCESS,
    FETCH_DELETE_CUSTOMER_FAILURE,
  } from  '../../types/customer/customer';

  import settings from '../../setting';
  import axios from "axios";
  import { apiToastError, apiToastSuccess } from "../../modules/utils.js";
  
  export const fetchDeleteCustomerRequest = () => ({
    type: FETCH_DELETE_CUSTOMER_REQUEST,
  });
  
  export const fetchDeleteCustomerSuccess = (data) => ({
    type: FETCH_DELETE_CUSTOMER_SUCCESS,
    data,
  });
  
  export const fetchDeleteCustomerFailure = (error) => ({
    type: FETCH_DELETE_CUSTOMER_FAILURE,
    error,
  });
  
  export const fetchDeleteCustomer = (id) => (dispatch) => {
    const apiUrl = `${settings.endPoint}/customer`;
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    };
  
    dispatch(fetchDeleteCustomerRequest());
    console.log(`${apiUrl}/${id}`);
    return axios
      .delete( `${apiUrl}/${id}`,config)
      .then((data) => {
        apiToastSuccess("Successfully Deleted")
        dispatch(fetchDeleteCustomerSuccess(data));
      })
      .catch((error) => {
         
      apiToastError("Unable to Delete")
      dispatch(fetchDeleteCustomerFailure(error));
      });
  };
  