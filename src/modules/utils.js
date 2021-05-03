import { toast } from 'react-toastify';

export const apiToastSuccess = (data) => {
	
	showToast(data, 1);
	if (data && data.data && data.data.message) {
		showToast(data.data.message, 1);
	} else if (data && data.data && data.data.responseMessage) {
		
		showToast(data.data.responseMessage, 1);
	}
};

export const apiToastError = (error) => {
	
	if (
		error &&
		error.response &&
		error.response.data &&
		error.response.data.message
	) {
		showToast(error.response.data.message, 0);
	} else if (error && error.data && error.data.message) {
		showToast(error.data.responseMessage, 0);
	} else if (error && error.responseMessage) {
		showToast(error.responseMessage, 0);
	}else{
		showToast(error, 0);
	}
};

export const showToast = (msg, status) => {
	if (status) {
		toast.success(msg);
	} else {
		toast.error(msg);
	}
};