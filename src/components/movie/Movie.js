import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchMoviesList} from '../../actions/movie/moviesListAction'
import { fetchDeleteMovies } from '../../actions/movie/deleteMoviesAction'
import Navigation from '../home/Navigation'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import bootbox from 'bootbox/bootbox';

class Movie extends Component {
    constructor(props) {
        super(props);
        
    }
    getMovieList = () =>{
        
        this.props?.fetchMoviesList()?.then(() => {
          
            })
    }
    componentDidMount(){
        this.getMovieList();
    }
    handleEdit(id){
        const {history } = this.props;
        history.push(`edit-movie/${id}`);
    }
  
    
    handleDelete(id)
    { 
 
        {bootbox.confirm({
            message: "Are you sure to delete this genere ?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-sm btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-sm btn-danger'
                }
            },
            callback: (result) =>{
                
                if(result){

                    this.props.fetchDeleteMovies(id).then(() => {
                        const { deleteMoviesData } = this.props;
                        if (deleteMoviesData) {
                            this.getMovieList();
                        }
                });}
            }
        }).
        css({ 'margin-top': '12%'})
        }
    }
    getColumn(){
        return [
            {
                Header: "ID",
                accessor: "_id",
               
            },
            {
                Header: "Title",
                accessor: "title",
               
            }, 
            {
                Header: "Daily Rental Rate",
                accessor: "dailyRentalRate",
               
            },
            {
                Header: "Movie Stoks",
                accessor: "numberInStock",
               
            },
            {
                Header: "Actions",
                Cell : row => <div>
                    <a style={{color : "#0099ff", fontSize : "15px"}} className="m-3 " onClick={() => this.handleEdit(row.row._id)}><i className="fa fa-pencil"></i> </a> 
                    <a style={{color : "#ff0000", fontSize : "15px"}} className="m-3 " onClick={() => this.handleDelete(row.row._id)}><i className="fa fa-trash"></i> </a>
                </div>
                
            }
            ];
    }
    render() {
        
        const {moviesListData } = this.props;

        const column = this.getColumn()
        
        const { history } = this.props
        return (
            <div className="main-root">
                <Navigation />
                <div className="float-right p-4 main-content"> 
                    <div className="box-content p-3">
                    <div className="text mb-5 px-5 py-4">
                        <h3 className="float-left">Movies</h3>
                        <div className="float-right">
                            <button type="button" onClick={() => history.push("add-movie")} class="btn btn-danger"><i class="fa fa-plus" aria-hidden="true"></i> Add Movie</button>
                        </div>
                    </div>
                    <div>
						<ReactTable
							getTdProps={this.handleRowClick}
							data={moviesListData}
							columns={column}
							defaultPageSize={10}
							className="-table -table-striped  -highlight my-5 mx-3 text-center"
							showPagination={true}
							sortable={true}
							multiSort={false}
							resizable={false}
							filterable={false}
						/>
					</div>
                    </div>
                </div>
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        moviesListLoading: state.moviesList.isLoading,
        moviesListData: state.moviesList?.data?.data || [],
        moviesListError: state.moviesList?.error || {},
    
        deleteMoviesLoading: state.deleteMovies.isLoading,
        deleteMoviesData: state.deleteMovies?.data || [],
        deleteMoviesError: state.deleteMovies?.error || {},
    
    };
};
    
const mapDispatchToProps = {
    fetchMoviesList,
    fetchDeleteMovies,
};
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
