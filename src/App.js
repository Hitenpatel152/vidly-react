import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { ToastContainer } from 'react-toastify';
 
import reducers from './reducers';
import './App.css';

import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter , Switch ,Route} from 'react-router-dom'
import NetworkService from './network-service';


import Router from './Router';


const createStoreWithMiddleware =
	process.env.NODE_ENV === 'development'
		? applyMiddleware(logger, reduxThunk)(createStore)
		: applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
NetworkService.setupInterceptors(store);
function App() {
  return (
   
      <Provider store={store}>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
      <BrowserRouter>
		{/* <Switch>
          <Route exact path='/' component={LoginClass} />
          <Route exact path='/login' component={LoginClass} />
          <Route exact path='/register' component={SignUpClass} />
		  <Route exact path='/home' component={Home} />
		  <Route exact path='/genere' component={Genere} />
		  <Route exact path='/movie' component={Movie} />
		  <Route exact path='/rental' component={Rental} />
		  <Route exact path='/customer' component={Customer} />
        </Switch> */}
		<Router />
      </BrowserRouter>
		</Provider>
  );
}

export default App;
