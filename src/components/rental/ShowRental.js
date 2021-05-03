import React, { Component } from 'react';
import Navigation from '../home/Navigation'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchRentalDetail } from '../../actions/rental/rentalDetail'
class ShowRental extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        if(this.getRentalId()){
            this.props.fetchRentalDetail(this.getRentalId());
        }
    }
   
    getRentalId = ()=>{
        const {match} = this.props;
        return match?.params?.id || "";
    }
   

    render() {
        const { rentalDetailData } = this.props;
        
        return (
            <div className="main-root">
                <Navigation />
                    <div className="float-right p-4 main-content"> 
                        <div className="box-content p-3">
                            <div className="row justify-content-center">
                                {rentalDetailData && <div className="add-box p-4">
                                    <div className="text mb-5 px-2 py-2">
                                        <h3 className="float-left">Rental </h3>    
                                    </div>
                                    <hr />
                                    <div className="text mb-2 px-2 py-2">
                                    <h4 className="float-left"> Name  : {rentalDetailData.data.customer.name} </h4>    
                                    <h4 className="float-right">Contact  : {rentalDetailData.data.customer.contact} </h4>    
                                    </div>
                                    
                                    <table className="table border shadow">
                                        <thead className="thead-light">
                                            <tr>
                                            <th scope="col">index</th>
                                            <th scope="col">Movie Title</th>
                                            <th scope="col">No Movie</th>
                                            <th scope="col">Movie Daily Rent</th>
                                            <th scope="col">Total Rent</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                
                                                rentalDetailData.data.movies.map((movie , index)=>(
                                                <tr key={index + 1}>
                                                    <th scope="row">{index + 1}</th>
                                                    <th scope="row">{movie.movie.title}</th>
                                                    <td>{movie.count}</td>
                                                    <td>{movie.movie.dailyRentalRate}</td>
                                                    <td>{movie.movie.dailyRentalRate * movie.count}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                  <hr />
                                   <div>
                                        
                                        
                                        <Typography variant="h6" gutterBottom className="float-right mx-4">
                                           Total Amount : {rentalDetailData.finalAmount}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom className="float-right mx-4">
                                           Total Day : {rentalDetailData.finalAmount / rentalDetailData.dailyRent}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom className="float-right mx-4"> 
                                           Daily Amount : {rentalDetailData.dailyRent}
                                        </Typography>
                                    </div>
    
                                    </div>
    }
                                </div>
                        </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
   
    return {
        rentalDetailLoading: state.rentalDetail.isLoading,
        rentalDetailData: state.rentalDetail?.data,
        rentalDetailError: state.rentalDetail?.error || {},
    };
    };
    
    const mapDispatchToProps = {
        fetchRentalDetail
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(ShowRental);