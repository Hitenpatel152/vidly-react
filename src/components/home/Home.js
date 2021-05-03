import React , { Component }from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import MovieIcon from '@material-ui/icons/Movie';
import TheatersIcon from '@material-ui/icons/Theaters';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import {fetchMoviesList} from '../../actions/movie/moviesListAction'
import {fetchRentalList} from '../../actions/rental/listRental'
import {fetchGenereList} from '../../actions/genere/genereList'
import {fetchCustomerList} from '../../actions/customer/customerList'
class Home extends Component {
  constructor(props) {
    super(props);
    
}
getCustomerList = () =>{
  this.props.fetchCustomerList().then(()=>{
    const {customerListData} = this.props;
    
  })
}
  getGenereList = () =>{
    this.props?.fetchGenereList()?.then(() => {
        
        })
}
  getRentalList = () =>{
        
    this.props?.fetchRentalList()?.then(() => {
       
        })
}
  getMovieList = () =>{
        
    this.props?.fetchMoviesList()?.then(() => {
      
        })
}
componentDidMount(){
    this.getMovieList();
    this.getRentalList();
    this.getGenereList();
    this.getCustomerList();
}
    render(){
    return (
      <div className="main-root">
        <Navigation />
          <div className="float-right p-5 main-content"> 
              <h4>Home</h4>
              <div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <div class="box bg-primary">
                  <TheatersIcon />
                  <h3>{this.props.genereListData.length}</h3>
                  <p class="lead">Generes</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box bg-danger">
                 <MovieIcon />
                  <h3>{this.props.moviesListData.length}</h3>
                  <p class="lead">Movies</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box bg-warning">
                  <AssignmentIcon />
                  <h3>{this.props.rentalListData.length}</h3>
                  <p class="lead">Rentals</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box bg-success">
                  <PersonIcon />
                  <h3>{this.props.customerListData.length}</h3>
                  <p class="lead">Customers</p>
                </div>
              </div>
            </div>
            </div>
          </div>
    </div>
    )
    }
};

const mapStateToProps = (state) => {
  return {
      moviesListLoading: state.moviesList.isLoading,
      moviesListData: state.moviesList?.data?.data || [],
      moviesListError: state.moviesList?.error || {},
    
      rentalListLoading: state.rentalList.isLoading,
      rentalListData: state.rentalList?.data?.data || [],
      rentalListError: state.rentalList?.error || {},

      genereListLoading: state.genereList.isLoading,
    genereListData: state.genereList?.data?.data || [],
    genereListError: state.genereList?.error || {},

    customerListLoading: state.customerList.isLoading,
      customerListData: state.customerList?.data?.data || [],
      customerListError: state.customerList?.error || {},
  };
};
  
const mapDispatchToProps = {
  fetchMoviesList,fetchRentalList,fetchGenereList,fetchCustomerList,
  
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);