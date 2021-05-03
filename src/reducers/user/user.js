import {
	FETCH_REGISTER_REQUEST,
	FETCH_REGISTER_SUCCESS,
	FETCH_REGISTER_FAILURE,
} from '../../types/user/user';

const initialState = {
	data: null,
	error: null,
	isLoading: false,
};

const RegisterReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case FETCH_REGISTER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_REGISTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.data.data,
				error: null,
			};
		case FETCH_REGISTER_FAILURE:
			return {
				...state,
				isLoading: false,
				data: null,
				error: action.error.response,
			};
		default:
			return state;
	}
};

export default RegisterReducer;
