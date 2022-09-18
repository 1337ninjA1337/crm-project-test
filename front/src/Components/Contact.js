import React, { Component } from 'react';
import {Table} from "react-bootstrap"
import { Button, ButtonToolbar } from 'react-bootstrap'
import AddContact from './AddContact';
import EditContact from './EditContact';

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {contacts:[], addModalShow: false, editModalShow: false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API)
        .then(response=>response.json())
        .then(data=>{
            this.setState({contacts:data})
        })
    }

    deleteContact(contactId){
        if(window.confirm("Are you sure want to delete this contact?")){
            fetch(process.env.REACT_APP_API+contactId, {
                method: "DELETE",
                header: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
        }
    }

    componentDidMount() {
        this.refreshList()
    }

    componentDidUpdate() {
        this.refreshList()    
    }

    render() { 
        let {contacts, ContactID, ContactName, MobilePhone, JobTitle, BirthDate} = this.state
        let addModalClose = ()=>this.setState({addModalShow: false})
        let editModalClose = ()=>this.setState({editModalShow: false})
        return ( 
            <div className='d-flex flex-column justify-content-center align-items-center'>
                

                <ButtonToolbar className='mt-2 '>
                    <Button variant="primary" onClick={()=>this.setState({addModalShow:true})} >
                        Add Contact
                    </Button>

                    <AddContact show={this.state.addModalShow} onHide={addModalClose}></AddContact>
                </ButtonToolbar>

                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Contact Name</th>  
                            <th>Mobile Phone</th>
                            <th>Job Title</th>
                            <th>Birth Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map(el=>{
                                return (<tr key={el.ContactID}>
                                    <td>{el.ContactName}</td>
                                    <td>{el.MobilePhone}</td>
                                    <td>{el.JobTitle}</td>
                                    <td>{el.BirthDate}</td>
                                    <td>
                                        <ButtonToolbar className='d-flex justify-content-around'  >
                                            <Button  variant="info" onClick={()=>{
                                                this.setState({
                                            editModalShow:true,
                                            ContactID: el.ContactId,
                                            ContactName: el.ContactName, 
                                            MobilePhone: el.MobilePhone,
                                            JobTitle: el.JobTitle,
                                            BirthDate: el.BirthDate })
                                            }} > Edit
                                            </Button>

                                            <EditContact show={this.state.editModalShow} 
                                            onHide={editModalClose} 
                                            contactid={ContactID}
                                            contactname={ContactName}
                                            mobilephone={MobilePhone}
                                            jobtitle={JobTitle}
                                            birthdate={BirthDate}></EditContact>

                                            
                                            <Button  variant="danger" onClick={()=>this.deleteContact(el.ContactId)} > Delete </Button>
                                        </ButtonToolbar>

                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>

                </Table>
            </div>
        );
    }
}
 
export default Contact;