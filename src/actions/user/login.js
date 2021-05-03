import axios from 'axios';
import {
	FETCH_LOGIN_REQUEST,
	FETCH_LOGIN_SUCCESS,
	FETCH_LOGIN_FAILURE,
	ACTION_LOGOUT,
} from '../../types/user/user';
import settings from '../../setting';


import { apiToastSuccess, apiToastError } from '../../modules/utils';

export const fetchLoginRequest = () => ({
	type: FETCH_LOGIN_REQUEST,
});

export const fetchLoginSuccess = (data) => ({
	type: FETCH_LOGIN_SUCCESS,
	data,
});

export const fetchLoginFailure = (error) => ({
	type: FETCH_LOGIN_FAILURE,
	error,
});

export const actionLogout = () => ({
	type: ACTION_LOGOUT,
});

export const setLogout = () => (dispatch) => {
	dispatch(actionLogout());
	localStorage.removeItem('authToken');
	window.location.reload();
};

export const fetchLogin = (data) => (dispatch) => {
	const apiUrl = `${settings.endPoint}/user/login`;

	const formData = {
		...data
	};
    console.log(formData);
	dispatch(fetchLoginRequest());

	return axios
		.post(apiUrl, formData)
		.then((data) => {
           
			if(data.data.result){
				console.log("object");
				localStorage.setItem(
								'authToken', data.data.token
							);
				apiToastSuccess("You are Login SuccessFully!!!");
				dispatch(fetchLoginSuccess(data));
				
			}else{
				apiToastError(data);
				dispatch(fetchLoginFailure(data));
			}
				
			
		})
		.catch((error) => {
			apiToastError(error);
			dispatch(fetchLoginFailure(error));
		});
};
