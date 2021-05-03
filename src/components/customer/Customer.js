import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCustomer from './AddCustomer'
import Navigation from '../home/Navigation'
import { Formik } from 'formik';
import {fetchCustomerList} from '../../actions/customer/customerList'
import { fetchDeleteCustomer } from '../../actions/customer/fetchDeleteCustomer'
import {fetchCustomerDetail} from '../../actions/customer/customerDetail'
import {fetchUpdateCustomer} from '../../actions/customer/fetchUpdateCustomer';
import {
	displayFormErrors,
	customerValidations,
} from '../../modules/validation';
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";

import bootbox from 'bootbox/bootbox';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          open : false
        }
    }
    getCustomerList = () =>{
      this.props.fetchCustomerList().then(()=>{
        const {customerListData} = this.props;
        
      })
    }
    componentDidMount(){
      this.getCustomerList()
    }
    initialValues = () =>{
      const {customerDetailData} = this.props;
      return {
        name : customerDetailData?.data?.name || '',
        contact : customerDetailData?.data?.contact || ''
      }
    }   
    handleEdit =(id) =>{
      
      this.props.fetchCustomerDetail(id).then(()=>{
        const {customerDetailData} = this.props;
        
        this.setState({
          open:true,
        })
      })
    }
    handleClose = () =>{
      this.setState({
        open:false
      })
    }
    handleSubmit =(values) =>{
      const {customerDetailData} = this.props;
      this.props.fetchUpdateCustomer(values , customerDetailData.data._id).then(()=>{
        
        this.handleClose()
        this.getCustomerList()
      })
     
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

                  this.props.fetchDeleteCustomer(id).then(() => {
                      const { deleteCustomerData } = this.props;
                      if (deleteCustomerData) {
                          this.getCustomerList();
                      }
              });
              }
          }
      }).
      css({ 'margin-top': '12%'})
  }
}
    getColumn = () =>{
      return [
        {
            name: "ID",
            selector: "_id",
            sortable: true
        },
        {
            name: "Name",
            selector: "name",
            sortable: true
        },
        {
            name: "Contact",
            selector: "contact",
            sortable: true
        },
        {
            name: "Actions",
            cell: row => <div data-tag="allowRowEvents">
                            <a style={{color : "#0099ff", fontSize : "15px"}} className="m-3 fa fa-pencil" onClick={() => this.handleEdit(row._id)}></a> 
                            <a style={{color : "#ff0000", fontSize : "15px"}} className="m-3 fa fa-trash" onClick={() => this.handleDelete(row._id)}></a>
                        </div>,

        },
        ];
    }
    render() {
      const {customerListData} = this.props;
        return (
            <div className="main-root">
                <Navigation />
                  <div className="float-right p-4 main-content"> 
                    <div className="box-content p-3">
                      <div className="text mb-5 px-5 py-4">
                        <h3 className="float-left">Customer</h3>
                        <br />
                        <hr />
                        <div>
                          <h4>Add New Customer</h4>
                          <AddCustomer className="p-3 m-3" customerList = {this.getCustomerList}/>
                        </div>
                        <hr />
                        <DataTable
                          title= "Customer List"
                          striped
                          columns={this.getColumn()}
                          data={customerListData}
                          defaultSortField="title"
                          sortIcon={<SortIcon />}
                          sortable
                          pagination
                          highlightOnHover
                          responsive
                          // onSelectedRowsChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Dialog open={this.state.open}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                    <DialogContent>
                    {this.props.customerDetailData && <Formik
                                  enableReinitialize
                                  initialValues={this.initialValues()}
                                  validationSchema={customerValidations()}
                                  onSubmit={this.handleSubmit}
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
                                          <form onSubmit={handleSubmit}  autoComplete="off" className="form form-inline align-items-center" id="formLogin" name="formLogin" role="form">
                                              <div className="col-auto mt-2">
                                                  <input type="text" className="form-control mb-2" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Name" />
                                                  {showError("name")}
                                              </div>
                                              <div className="col-auto mt-2">
                                                  <input type="text" className="form-control mb-2" name="contact" value={values.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Contact" />
                                                  {showError("contact")}
                                              </div>
                                              <DialogActions className="float-right">
                                              <Button onClick={this.handleClose} color="primary">
                                                Cancel
                                              </Button>
                                              <Button type="submit" color="primary">
                                                Submit
                                              </Button>
                                            </DialogActions>
                                          </form>
                                      )
                                  } 
                              }   
                              </Formik >
                      }
                      
                    </DialogContent>
                   
                  </Dialog>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
  return {
      customerListLoading: state.customerList.isLoading,
      customerListData: state.customerList?.data?.data || [],
      customerListError: state.customerList?.error || {},

      deleteCustomerLoading: state.deleteCustomer.isLoading,
      deleteCustomerData: state.deleteCustomer?.data || [],
      deleteCustomerError: state.deleteCustomer?.error || {},

      customerDetailLoading: state.customerDetail.isLoading,
      customerDetailData: state.customerDetail?.data || [],
      customerDetailError: state.customerDetail?.error || {},

      updateCustomerLoading: state.updateCustomer.isLoading,
      updateCustomerData: state.updateCustomer?.data || [],
      updateCustomerError: state.updateCustomer?.error || {},
  };
  };
  
const mapDispatchToProps = {
  fetchCustomerList,
  fetchDeleteCustomer,
  fetchCustomerDetail,
  fetchUpdateCustomer
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
 
