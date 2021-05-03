import React, { Component } from 'react';
import Navigation from '../home/Navigation'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { fetchAddGenere } from '../../actions/genere/fetchAddGenere'
import {fetchGenereDetail} from '../../actions/genere/genereDetail'
import {fetchUpdateGenere} from '../../actions/genere/fetchUpdateGenere'
class GenereAdd extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        if(this.getGenereId()){
            this.props.fetchGenereDetail(this.getGenereId());
        }
    }
    initialValues(){
        const {genereDetailData} = this.props;
       
        let detail = genereDetailData.data;
        if(!this.getGenereId()){
            detail=null
        }
        
        return {
            name : detail?.name || ""
        }
    }
    getGenereId = ()=>{
        const {match} = this.props;
        
        return match?.params?.id || "";
    }
    onHandleSubmit = (values)=>{
        if (!this.getGenereId()) {
            this.props.fetchAddGenere(values).then(() => {
                const { genereAddData, history } = this.props;
                if (genereAddData) {
                    history.push("/genere");
                }
            })
        }else{
            this.props.fetchUpdateGenere(values, this.getGenereId()).then(() => {
                const { updateGenereData, history } = this.props;
                    if (updateGenereData) {
                        history.push("/genere");
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
                                        <h3 className="float-left">Genere</h3>    
                                    </div>
                                    <hr />
                                    {!this.props.genereDetailLoading && <Formik
                                    initialValues={this.initialValues()}
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
                                        
                                        
                                            return (
                                                <form onSubmit={handleSubmit}  autoComplete="off" className="form" id="formLogin" name="formLogin" role="form">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Genere Name</label> 
                                                        <input className="form-control" required  type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                                        
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
        genereAddLoading: state.addGenere.isLoading,
        genereAddData: state.addGenere?.data || [],
        genereAddError: state.addGenere?.error || {},

        genereDetailLoading: state.genereDetail.isLoading,
        genereDetailData: state.genereDetail?.data || [],
        genereDetailError: state.genereDetail?.error || {},

        updateGenereLoading: state.updateGenere.isLoading,
        updateGenereData: state.updateGenere?.data || [],
        updateGenereError: state.updateGenere?.error || {},
    };
    };
    
    const mapDispatchToProps = {
        fetchAddGenere,
        fetchGenereDetail,
        fetchUpdateGenere
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(GenereAdd);