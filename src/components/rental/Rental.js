import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRentalList} from '../../actions/rental/listRental'
import { fetchDeleteRental } from '../../actions/rental/deleteRental'

import Navigation from '../home/Navigation'
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import 'react-table-6/react-table.css';
import bootbox from 'bootbox/bootbox';

class Rental extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
          }
    }
    getRentalList = () =>{
        
        this.props?.fetchRentalList()?.then(() => {
           
            })
    }
    componentDidMount(){
        this.getRentalList();
    }
    handleEdit =(id) =>{
       
        const {history} = this.props;
        history.push(`show-rental/${id}`)
        
      }
  
    handleClose = () =>{
        this.setState({
          open:false
        })
      }
    handleDelete(id)
    { 
 
        {bootbox.confirm({
            message: "Are you yure to Complete this rental ?",
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

                    this.props.fetchDeleteRental(id).then(() => {
                        const { deleteRentalData } = this.props;
                        if (deleteRentalData) {
                            this.getRentalList();
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
                name: "ID",
                selector: "_id",
                sortable: true
            },
            {
                name: "Customer",
                selector: "customer.name",
                sortable: true
            },
            {
                name: "Date",
                cell: row => { 
                    const daydate = new Date(row.date)
                    return (<div data-tag="allowRowEvents">
                                <span style={{ fontSize : "15px"}} > {daydate.getFullYear() + '-' + (daydate.getMonth() + 1) + '-' + daydate.getDate()}</span> 
                                </div>)}
            },
            {
                name: "Actions",
                cell: row => <div data-tag="allowRowEvents">
                                <a style={{color : "#0099ff", fontSize : "15px"}} className="m-3 fa fa-eye" onClick={() => this.handleEdit(row._id)}></a> 
                                <a style={{color : "#ff0000", fontSize : "15px"}} className="m-3 fa fa-check" onClick={() => this.handleDelete(row._id)}></a>
                            </div>,
    
            },
            ];
    }
    render() {
        
        const {rentalListData } = this.props;
        const { history } = this.props
        return (
            <div className="main-root">
                <Navigation />
                <div className="float-right p-4 main-content"> 
                    <div className="box-content p-3">
                    <div className="text mb-5 px-5 py-4">
                        <h3 className="float-left">Rental</h3>
                        <div className="float-right">
                            <button type="button" onClick={() => history.push("add-rental")} className="btn btn-danger"><i className="fa fa-plus" aria-hidden="true"></i> Add Rental</button>
                        </div>
                    </div>
                    <div>
                    <DataTable
                          title= "Rental List"
                          striped
                          columns={this.getColumn()}
                          data={rentalListData}
                          defaultSortField="title"
                          sortIcon={<SortIcon />}
                          sortable
                          pagination
                          highlightOnHover
                          responsive
                          
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
        rentalListLoading: state.rentalList.isLoading,
        rentalListData: state.rentalList?.data?.data || [],
        rentalListError: state.rentalList?.error || {},
    
        deleteRentalLoading: state.deleteRental.isLoading,
        deleteRentalData: state.deleteRental?.data || [],
        deleteRentalError: state.deleteRental?.error || {},
    };
};
    
const mapDispatchToProps = {
    fetchRentalList,
    fetchDeleteRental
};
export default connect(mapStateToProps, mapDispatchToProps)(Rental);