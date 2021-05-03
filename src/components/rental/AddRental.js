import React, { Component } from 'react';
import Navigation from '../home/Navigation'

import { Formik, Form, Field, FieldArray, ErrorMessage} from "formik";
import { connect } from 'react-redux';
import { fetchAddRental } from '../../actions/rental/addRental'
import {fetchMoviesDetail} from '../../actions/movie/movieDetailsAction'

import {fetchUpdateMovies} from '../../actions/movie/updateMoviesAction'
import {fetchCustomerList} from '../../actions/customer/customerList'
import {fetchMoviesList} from '../../actions/movie/moviesListAction'
import {
	displayFormErrors,
	rentalValidations,
} from '../../modules/validation';
class MovieAdd extends Component {
    constructor(props) {
        super(props);

    }
    getCustomerList = () =>{
        this.props.fetchCustomerList().then(()=>{
          const {customerListData} = this.props;
          
        })
      }
      getMovieList = () =>{
        this.props.fetchMoviesList().then(()=>{
          const {moviesListData} = this.props;
          
        })
      }
   
    componentDidMount() {
        this.getCustomerList();
        this.getMovieList();
    }
    initialValues(){
        
        const initvalueobj = {
            
            customer :'',
            noOfMovie:1,
            moviesArray:[
                {
                    movie : '',
                    count:''
                }
            ],
        }
        
        return initvalueobj;
    }
    onHandleSubmit = (values)=>{
        values = {
            customer : values.customer,
            movies: values.moviesArray
        }
            this.props.fetchAddRental(values).then(() => {
                const { rentalAddData, history } = this.props;
                if (rentalAddData) {
                    history.push("/rental");
                }
            })
        
    }
     onChangeTickets = (e,field, values, setValues) => {
       
        const moviesArray = [...values.moviesArray];
        const noOfMovie = e.target.value || 0;
        
        const previousNumber = values.noOfMovie
       
        if (previousNumber < noOfMovie) {
            for (let i = previousNumber; i < noOfMovie; i++) {
                moviesArray.push({movie : '',count:''});
            }
        } else {
            for (let i = previousNumber; i >= noOfMovie; i--) {
                moviesArray.splice(i, 1);
            }
        }
       
        setValues({ ...values, moviesArray });

        
    }


    render() {
       
        return (
            <div className="main-root">
                <Navigation />
                    <div className="float-right p-4 main-content"> 
                        <div className="box-content p-3">
                            <div className="row justify-content-center">
                                <div className="add-box p-4">
                                    <div className="text mb-5 px-2 py-2">
                                        <h3 className="float-left">Rental</h3>    
                                    </div>
                                    <hr />
                                    <Formik
                                     enableReinitialize
                                    initialValues={this.initialValues()}
                                    validationSchema={rentalValidations()}
                                    onSubmit={this.onHandleSubmit}
                                    >
                                        {
                                        ({
                                            values,
                                            errors,
                                            touched,
                                            setValues,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            submitCount,
                                        }) => {
                                            const showError = (key) =>{
                                                return displayFormErrors(key, errors, touched, submitCount);
                                            }
                                        
                                            return ( <>
                                                
                                                <form onSubmit={handleSubmit}  autoComplete="off" className="form" id="formLogin" name="formLogin" role="form">
                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="name">Select Customer</label> 
                                                        <select className="form-select" aria-label="Default select example" className="form-control"  name="customer" value={values.customer} onChange={handleChange} onBlur={handleBlur}>
                                                            <option selected>Open This Customer List</option>
                                                            {
                                                                this.props.customerListData.map((customer) => {
                                                                    return <option key={customer._id} value={customer._id} className="form-control">{`${customer.name} - ${customer.contact}`} </option>
                                                                })
                                                            }
                                                        </select>
                                                        {showError('customer')}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Select No Of Movie</label> 
                                                        <select className="form-select" aria-label="Default select example" className="form-control"  name="noOfMovie" value={values.noOfMovie} onChange={ (e) => {this.onChangeTickets(e, this, values, setValues);  handleChange(e)}} onBlur={handleBlur}>
                                                            
                                                            <option key={1} value={1} className="form-control">{1}</option>
                                                            <option key={2} value={2} className="form-control">{2}</option>
                                                            <option key={3} value={3} className="form-control">{3}</option>
                                                            <option key={4} value={4} className="form-control">{4}</option>
                                                            <option key={5} value={5} className="form-control">{5}</option>
                                                            <option key={6} value={6} className="form-control">{6}</option>
                                                        </select>
                                                        
                                                    </div>
                                                    
                                                    {values.moviesArray.map((movieone , index) => {
                                                       return  <div className="form-group form-inline align-items-center">
                                                                <label htmlFor="name" className="mr-2">Select Movie </label> 
                                                                <select className="form-select" aria-label="Default select example" className="form-control mr-3"  name={`moviesArray.${index}.movie`} value={movieone.movie} onChange={handleChange} onBlur={handleBlur}>
                                                                    <option selected>Open This Movies List</option>
                                                                    {
                                                                        this.props.moviesListData.map((movie) => {
                                                                            return <option key={movie._id} value={movie._id} className="form-control">{`${movie.title}  - Rent ~ ${movie.dailyRentalRate}`} </option>
                                                                        })
                                                                    }
                                                                </select>
                                                                
                                                                 <ErrorMessage  className="ml-2" name={`moviesArray.${index}.movie`} >
                                                                    {msg => <div className="text-danger input-feedback font12" >{msg}</div>}
                                                                </ErrorMessage>
                                                                <div className="form-group ml-4 mr-4">
                                                                    <label htmlFor="count" className="mr-2 mr-2">No of Movie</label> 
                                                                    <input className="form-control"   type="number" name= {`moviesArray.${index}.count`} value={movieone.count} onChange={handleChange} onBlur={handleBlur} />
                                                                    
                                                                </div>
                                                                <ErrorMessage  className="ml-2" name={`moviesArray.${index}.count`} >
                                                                    {msg => <div className="text-danger input-feedback font12" >{msg}</div>}
                                                                </ErrorMessage>
                                                               
                                                        </div>
                                                   })}
                                                    
                                                        
                                                
                                                <div class="text-center">
                                                        <button className="btn btn-success btn-lg text-center mx-3 float-right"  type="submit">Submit</button>
                                                </div>
                                                
                                                    
                                                    
                                                </form>
                                                </>
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
        
        rentalAddLoading: state.addRental.isLoading,
        rentalAddData: state.addRental?.data || [],
        rentalAddError: state.addRental?.error || {},

        customerListLoading: state.customerList.isLoading,
        customerListData: state.customerList?.data?.data || [],
        customerListError: state.customerList?.error || {},

        moviesListLoading: state.moviesList.isLoading,
        moviesListData: state.moviesList?.data?.data || [],
        moviesListError: state.moviesList?.error || {},
    };
    };
    
    const mapDispatchToProps = {
        fetchAddRental,
        fetchMoviesDetail,
        fetchUpdateMovies,

       
        fetchCustomerList,
        fetchMoviesList
    };
       
export default connect(mapStateToProps, mapDispatchToProps)(MovieAdd);