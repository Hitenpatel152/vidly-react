import { combineReducers } from 'redux';

import RegisterReducer from './user/user';
import LoginReducer from './user/login';

import GenereListReducer from './genere/genere';
import AddGenereReducer from './genere/addGenere';
import GenereDetailReducer from './genere/genereDetails';
import UpdateGenereReducer from './genere/updateGenre';
import DeleteGenerReducer from './genere/deleteGenere'

import MoviesListReducer from './movie/moviesReducer';
import AddMoviesReducer from "./movie/addMoviesReducer";
import DeleteMoviesReducer from "./movie/deleteMoviesReducer";
import UpdateMoviesReducer from "./movie/updateMoviesReducer";
import MoviesDetailReducer from "./movie/movieDetailsReducer";


import AddCustomerReducer from './customer/addCustomer';
import CustomerListReducer from './customer/customerList'
import DeleteCustomerReducer from './customer/deleteCustomer'
import CustomerDetailReducer from './customer/customerDetail';
import UpdateCustomerReducer from './customer/updateCustomer'


import AddRentalReducer from './rental/addRental';
import RentalListReducer from './rental/listRental';
import RentalDetailReducer from './rental/rentalDetail';
import DeleteRentalReducer from './rental/deleteRental'

const rootReducer = combineReducers({
    
    register: RegisterReducer,
    login: LoginReducer,

    genereList : GenereListReducer,
    addGenere : AddGenereReducer,
    genereDetail :GenereDetailReducer,
    updateGenere : UpdateGenereReducer,
    deleteGenere : DeleteGenerReducer,

    moviesList : MoviesListReducer,
    addMovies : AddMoviesReducer,
    deleteMovies : DeleteMoviesReducer,
    movieDetail : MoviesDetailReducer,
    updateMovies : UpdateMoviesReducer,

    addCustomer : AddCustomerReducer,
    customerList :CustomerListReducer,
    deleteCustomer : DeleteCustomerReducer,
    customerDetail : CustomerDetailReducer,
    updateCustomer: UpdateCustomerReducer,

    addRental:AddRentalReducer,
    rentalList:RentalListReducer,
    rentalDetail:RentalDetailReducer,
    deleteRental:DeleteRentalReducer
})

export default rootReducer;