import axios from 'axios';
import {
	FETCH_REGISTER_REQUEST,
	FETCH_REGISTER_SUCCESS,
	FETCH_REGISTER_FAILURE,
} from '../../types/user/user';
import settings from '../../setting';

import { apiToastSuccess, apiToastError } from '../../modules/utils';

export const fetchRegisterRequest = () => ({
	type: FETCH_REGISTER_REQUEST,
});

export const fetchRegisterSuccess = (data) => ({
	type: FETCH_REGISTER_SUCCESS,
	data,
});

export const fetchRegisterFailure = (error) => ({
	type: FETCH_REGISTER_FAILURE,
	error,
});

export const fetchRegister = (data) => (dispatch) => {
	const apiUrl = `${settings.endPoint}/user/register`;
    console.log(apiUrl);
	const formData = {
		...data,
		isAdmin : true
	};
    
	dispatch(fetchRegisterRequest());

	return axios
		.post(apiUrl, formData)
		.then((data) => {
           
				apiToastSuccess(data);
				dispatch(fetchRegisterSuccess(data));
		})
		.catch((error) => {
			apiToastError(error);
			dispatch(fetchRegisterFailure(error));
		});
};
