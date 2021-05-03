import React, { Component } from 'react';

import { Formik } from 'formik';
import { connect } from 'react-redux';
import { fetchAddCustomer } from '../../actions/customer/fetchAddCustomer'

import {
	displayFormErrors,
	customerValidations,
} from '../../modules/validation';
class AddCustomer extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        
    }
    initialValues(){
        return {
            name :'',
            contact :''
        }
    }
    
    onHandleSubmit = (values,{resetForm})=>{
       this.props.fetchAddCustomer(values).then(()=>{
            resetForm(this.initialValues())
            this.props.customerList()
       })
    }
    

    render() {
        
        return (
            <div>
                    {!this.props.genereDetailLoading && <Formik
                    enableReinitialize
                    initialValues={this.initialValues()}
                    validationSchema={customerValidations()}
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
                                <form onSubmit={handleSubmit}  autoComplete="off" className="form form-inline align-items-center" id="formLogin" name="formLogin" role="form">
                                    <div className="col-auto mt-2">
                                        <input type="text" className="form-control mb-2" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Name" />
                                        {showError("name")}
                                    </div>
                                    <div className="col-auto mt-2">
                                        <input type="text" className="form-control mb-2" name="contact" value={values.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Contact" />
                                        {showError("contact")}
                                    </div>
                                    <button className="btn btn-success btn-md text-center float-right"  type="submit">Submit</button>
                                </form>
                            )
                        } 
                    }   
                    </Formik >
                }
            </div>
                                   
        );
    }
}

const mapStateToProps = (state) => {
   
    return {
        customerAddLoading : state.addCustomer.isLoading,
        customerAddData: state.addCustomer?.data || [],
        customerAddError: state.addCustomer?.error || {},
    };
    };
    
    const mapDispatchToProps = {
        fetchAddCustomer
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);