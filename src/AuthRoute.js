import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from './components/home/Home';

import Genere from './components/genere/Genere';
import GenereAdd from './components/genere/GenereAdd';


import Movie from './components/movie/Movie';
import MovieAdd from './components/movie/MovieAdd';


import Rental from './components/rental/Rental';
import Customer from './components/customer/Customer';
import AddRental from "./components/rental/AddRental";
import ShowRental from "./components/rental/ShowRental";


const AuthRoute = () => {
    return (
        <main className="c-main">
        <Switch>
                <Route exact path="/rental" component={Rental}/>
                <Route exact path="/add-rental" component={AddRental}/>
                <Route exact path="/show-rental/:id" component={ShowRental}/>
                
                <Route exact path="/customer" component={Customer}/>
                
                
                <Route exact path="/genere" component={Genere}/>
                <Route exact path="/add-genere" component={GenereAdd}/>
                <Route exact path="/edit-genere/:id" component={GenereAdd}/>
                
                <Route exact path="/movie" component={Movie}/>
                <Route exact path="/add-movie" component={MovieAdd}/>
                <Route exact path="/edit-movie/:id" component={MovieAdd}/>

                <Route exact path="/home" component={Home}/>
            <Redirect from="/" to="/home" />
        </Switch>
        </main>
    );
    };
    
export default React.memo(AuthRoute);
