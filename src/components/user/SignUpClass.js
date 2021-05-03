import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import {
	displayFormErrors,
	registerValidations,
} from '../../modules/validation';
import {fetchRegister} from '../../actions/user/user'

class SignUpClass extends Component {
    constructor(props) {
        super(props);

    }
    onHandleSubmit = (values) => {
        
        this.props.fetchRegister(values).then(() => {
            const { registerData, history } = this.props;
            
            if(registerData){
                history.push('/login');
            }else{
                history.push('/register');
            }
            
        });
    
    }
    render() {
        return (
            <div class="hall container-fluid">
                <div class="hall row justify-content-center">
                    <div class="hall cn col-md-4">
                        <div class="card-css card card-outline-secondary">
                            <div class="card-header text-center">
                                <h3 class="mb-0">Register</h3>
                            </div>
                            <div class="card-body">

                            <Formik
                                initialValues={{
                                    name:'',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={registerValidations()}
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
                                                <label for="name">Name</label> 
                                                <input class="form-control"  required="" type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                                {showError('name')}
                                            </div>
                                            <div class="form-group">
                                                <label for="email">Email</label> 
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
                                                <button class="btn btn-success btn-lg text-center form-control" type="submit">Register</button>
                                            </div>
                                            <div class="form-group  text-center mt-3">
                                                <Link to={`/login`} className="text-danger input-feedback font12">Already have an account? Login</Link>
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
          registerLoading: state.register.isLoading,
          registerData: state.register.data,
      };
  };
  const mapDispatchToProps = {
      fetchRegister
  };
export default connect(mapStateToProps,mapDispatchToProps)(SignUpClass);