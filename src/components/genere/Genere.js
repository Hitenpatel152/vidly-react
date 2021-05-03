import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchGenereList} from '../../actions/genere/genereList'
import { fetchDeleteGenere } from '../../actions/genere/fetchDeleteGenere'
import Navigation from '../home/Navigation'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import bootbox from 'bootbox/bootbox';

class Genere extends Component {
    constructor(props) {
        super(props);
        
    }
    getGenereList = () =>{
        this.props?.fetchGenereList()?.then(() => {
            
            })
    }
    componentDidMount(){
        this.getGenereList();
    }
    handleEdit(id){
        const {history } = this.props;
        history.push(`edit-genere/${id}`);
    }
  
    
    handleDelete(id){ 
 
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

                    this.props.fetchDeleteGenere(id).then(() => {
                        const { deleteGenereData } = this.props;
                        if (deleteGenereData) {
                            this.getGenereList();
                        }
                });
                }
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
                Header: "Name",
                accessor: "name",
               
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
        
        const {genereListData ,genereListLoading} = this.props;

        const column = this.getColumn()
        
        const { history } = this.props
        return (
            <div className="main-root">
                <Navigation />
                <div className="float-right p-4 main-content"> 
                    <div className="box-content p-3">
                    <div className="text mb-5 px-5 py-4">
                        <h3 className="float-left">Generes</h3>
                        <div className="float-right">
                            <button type="button" onClick={() => history.push("add-genere")} class="btn btn-danger"><i class="fa fa-plus" aria-hidden="true"></i> Add Genere</button>
                        </div>
                    </div>
                    <div>
						<ReactTable
							getTdProps={this.handleRowClick}
							data={genereListData}
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
    genereListLoading: state.genereList.isLoading,
    genereListData: state.genereList?.data?.data || [],
    genereListError: state.genereList?.error || {},


    deleteGenereLoading: state.deleteGenere.isLoading,
    deleteGenereData: state.deleteGenere?.data || [],
    deleteGenereError: state.deleteGenere?.error || {},

};
};

const mapDispatchToProps = {
fetchGenereList,
fetchDeleteGenere,
};

export default connect(mapStateToProps, mapDispatchToProps)(Genere);
