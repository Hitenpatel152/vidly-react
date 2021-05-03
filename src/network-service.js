import axios from 'axios';
import { showToast } from './modules/utils';

export default {
	setupInterceptors: (store) => {
		axios.interceptors.response.use(
			function (response) {
                
               
				if (response?.data?.responseCode == 401) {
					showToast(response?.data?.responseMessage, 0);
					// localStorage.clear();
					// window.location.href = '/login';
				} else {
					return response;
				}
			},
			function (error) {
              
                if(error.response.status == 400){
                    // showToast(error.response.data.message, 0);
                    // localStorage.clear();
                    // window.location.href = '/login';
                }else if(error.response.status == 401){
					showToast(error.response.data.message, 0);
                    localStorage.clear();
                    window.location.href = '/login';
				}
               
				return Promise.reject(error);
			},
		);
	},
};
