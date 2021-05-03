import React, { Component } from 'react';
import Navigation from '../home/Navigation'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { fetchAddMovies } from '../../actions/movie/addMoviesAction'
import {fetchMoviesDetail} from '../../actions/movie/movieDetailsAction'
import {fetchGenereList} from '../../actions/genere/genereList'
import {fetchUpdateMovies} from '../../actions/movie/updateMoviesAction'
import {
	displayFormErrors,
	movieValidations,
} from '../../modules/validation';
class MovieAdd extends Component {
    constructor(props) {
        super(props);

    }
    getGenereList = () =>{
        this.props?.fetchGenereList()?.then(() => {
           
            })
    }
    componentDidMount() {
       
        if(this.getMovieId()){
            this.props.fetchMoviesDetail(this.getMovieId());
        }
        this.getGenereList();
    }
    initialValues(){
        const {movieDetailData} = this.props;
       
        let detail = movieDetailData.data;
        if(!this.getMovieId()){
            detail=null
        }
        
        const initvalueobj = {
            title : detail?.title || "",
            numberInStock : detail?.numberInStock || "",
            genere : detail?.genere || "",
            dailyRentalRate : detail?.dailyRentalRate || "",
            
        }
      
        return initvalueobj;
    }
    getMovieId = ()=>{
        const {match} = this.props;
        
        return match?.params?.id || "";
    }
    onHandleSubmit = (values)=>{
       
        if (!this.getMovieId()) {
            this.props.fetchAddMovies(values).then(() => {
                const { moviesAddData, history } = this.props;
                if (moviesAddData) {
                    history.push("/movie");
                }
            })
        }else{
            this.props.fetchUpdateMovies(values, this.getMovieId()).then(() => {
                const { updateMoviesData, history } = this.props;
                    if (updateMoviesData) {
                        history.push("/movie");
                    }
            });
        }
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
                                        <h3 className="float-left">Movie</h3>    
                                    </div>
                                    <hr />
                                    {(!this.props.movieDetailLoading  && !this.props.genereListLoading) && <Formik
                                    initialValues={this.initialValues()}
                                    validationSchema={movieValidations()}
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
                                                <form onSubmit={handleSubmit}  autoComplete="off" className="form" id="formLogin" name="formLogin" role="form">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Movie Title</label> 
                                                        <input className="form-control"   type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                                        {showError('title')}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Movie Stoks</label> 
                                                        <input className="form-control"   type="number" name="numberInStock" value={values.numberInStock} onChange={handleChange} onBlur={handleBlur} />
                                                        {showError('numberInStock')}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Movie Genere Type</label> 
                                                        <select className="form-select" aria-label="Default select example" className="form-control"  name="genere" value={values.genere} onChange={handleChange} onBlur={handleBlur}>
                                                            <option selected>Open This Genere Type Menu</option>
                                                            {
                                                                this.props.genereListData.map((genere) => {
                                                                    return <option key={genere._id} value={genere._id} className="form-control">{genere.name}</option>
                                                                })
                                                            }
                                                        </select>
                                                        {showError('genere')}
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="name">Movie Daily Rent</label> 
                                                        <input className="form-control"   type="number" name="dailyRentalRate" value={values.dailyRentalRate} onChange={handleChange} onBlur={handleBlur} />
                                                        {showError('dailyRentalRate')}
                                                    </div>
                                                
                                                    <div class="text-center">
                                                        <button className="btn btn-success btn-lg text-center mx-3 float-right"  type="submit">Submit</button>
                                                    </div>
                                                    
                                                </form>
                                            )
                                        } 
                                    }   
                                    </Formik >
                                }
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
        moviesAddLoading: state.addMovies.isLoading,
        moviesAddData: state.addMovies?.data || [],
        moviesAddError: state.addMovies?.error || {},
    
        movieDetailLoading: state.movieDetail.isLoading,
        movieDetailData: state.movieDetail?.data || [],
        movieDetailError: state.movieDetail?.error || {},
    
        updateMoviesLoading: state.updateMovies.isLoading,
        updateMoviesData: state.updateMovies?.data || [],
        updateMoviesError: state.updateMovies?.error || {},

        genereListLoading: state.genereList.isLoading,
        genereListData: state.genereList?.data?.data || [],
        genereListError: state.genereList?.error || {},
    };
    };
    
    const mapDispatchToProps = {
        fetchAddMovies,
        fetchMoviesDetail,
        fetchUpdateMovies,

        fetchGenereList,
    };
       
export default connect(mapStateToProps, mapDispatchToProps)(MovieAdd);