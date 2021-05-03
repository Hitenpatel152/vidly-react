import {
	FETCH_LOGIN_REQUEST,
	FETCH_LOGIN_SUCCESS,
	FETCH_LOGIN_FAILURE,
} from '../../types/user/user';

const initialState = {
	data: null,
	error: null,
	isLoading: false,
};

const LoginReducer = (state = initialState, action) => {
    
	switch (action.type) {
		case FETCH_LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.data.data,
				error: null,
			};
		case FETCH_LOGIN_FAILURE:
			return {
				...state,
				isLoading: false,
				data: null,
				error: action.error.data,
			};
		default:
			return state;
	}
};

export default LoginReducer;
