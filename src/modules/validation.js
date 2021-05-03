import * as Yup from 'yup';
const minValMessage = 'Minimum value should be 0';
const maxValMessage = 'Maximum value should be 100';
const phoneRegExp = '^\\d{10}$'
export const validator = (type) => {
	switch (type) {
		// case 'startDateTime':
		// 	return Yup.date().required('Required').min(moment(), 'Invalid');
		case 'emailRequired':
			return Yup.string().email('Invalid').required('Required');
		// case 'intPositiveRequired':
		// 	return Yup.number().positive(positiveValMessage).required('Required');
		case 'intRequired':
			return Yup.number()
				.min(0, minValMessage)
				.max(100, maxValMessage)
				.required('Required');
		// case 'notRequired':
		// 	return Yup.string().notRequired();
		// case 'requiredMultiSelect':
		// 	return Yup.array()
		// 		.min(1, 'Select at least one value')
		// 		.required('Required');
		case 'password':
			return Yup.string().required('Required');
		// .matches(
		// 	// /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		// 	/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/,
		// 	// /^(?=.*[A-Z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/,
		// 	'Password must have atleast 8 characters, including atleast one uppercase and one number',
		// );
		case 'phoneNumberRequired':
			return Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required')
		case 'required':
		default:
			return Yup.string().required('Required');
	}
};

export const displayFormErrors = (
	key = '',
	errors = {},
	touched = {},
	submitCount = 1,
) => {
	
	if (errors[key] !== undefined && errors[key] && submitCount) {
		return (
			<div className="text-danger input-feedback font12">{errors[key]}</div>
		);
	}
	return null;
};


export const registerValidations = () => {
	return Yup.object().shape({
        name: validator('required'),
		email: validator('emailRequired'),
		password: validator('password')
	});
};

export const loginValidations = () => {
	return Yup.object().shape({
		email: validator('emailRequired'),
		password: validator('password')
	});
};

export const movieValidations = () => {
	return Yup.object().shape({
		title: validator('required'),
		numberInStock: validator('intRequired'),
		genere:validator('required'),
		dailyRentalRate :validator('intRequired')
	});
}

export const customerValidations = () =>{
	return Yup.object().shape({
		name: validator('required'),
		contact: validator('phoneNumberRequired'),
	});
}
export const rentalValidations = () =>{
	return Yup.object().shape({
		customer: validator('required'),
		noOfMovie: validator('required'),
		// movie: validator('required'),
		// count:validator('intRequired'),
		moviesArray:Yup.array().of(
			            Yup.object().shape({
			                movie: validator('required'),
							count: validator('intRequired'),
			            })
			        )
	});
}
