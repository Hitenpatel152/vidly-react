import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import {
	displayFormErrors,
	loginValidations,
} from '../../modules/validation';
import {fetchLogin} from '../../actions/user/login'

import { Link } from 'react-router-dom';

class LoginClass extends Component {
    constructor(props) {
        super(props);

    }
    onHandleSubmit = (values) => {
		this.props.fetchLogin(values).then(() => {
			const { history, loginData, loginError } = this.props;
           
            if(loginData){
                history.push('/home');
            }else{
                history.push('/login');
            }
			
		});
	};
    render() {
        return (
            <div class="hall container-fluid">
                <div class="hall row justify-content-center">
                    <div class="hall cn col-md-4">
                        <div class="card-css card card-outline-secondary">
                            <div class="card-header text-center">
                                <h3 class="mb-0">Login</h3>
                            </div>
                            <div class="card-body">

                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={loginValidations()}
                                onSubmit={this.onHandleSubmit}
                            >
                                {
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    submitCount,
                                }) => {
                                
                                    const showError = (key) =>{
                                        return displayFormErrors(key, errors, touched, submitCount);
                                    }
                                    
                                    return (
                                        <form onSubmit={handleSubmit}  autocomplete="off" class="form" id="formLogin" name="formLogin" role="form">
                                            <div class="form-group">
                                                <label for="uname1">Email</label> 
                                                <input class="form-control"  required="" type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                {showError('email')}
                                            </div>
                                            <div class="form-group">
                                                <label>Password</label> 
                                                <input autocomplete="new-password" class="form-control" required="" type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />

                                                {showError('password')}
                                                <span>Note : please add Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>
                                            </div>
                                            <div class="text-center">
                                                <button class="btn btn-success btn-lg text-center form-control" type="submit">Login</button>
                                            </div>
                                            <div class="form-group  text-center mt-3">
                                                <Link to={`/register`} className="text-danger input-feedback font12"> Don't have an account? Signup</Link>
                                            </div>
                                        </form>
                                    )
                                } 
                            }   
                            </Formik >
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        loginLoading: state.login.isLoading,
		loginData: state.login.data,
		loginError: state.login.error,
    };
};
const mapDispatchToProps = {
    fetchLogin,
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginClass);