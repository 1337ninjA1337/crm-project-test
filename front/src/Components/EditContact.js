import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.handeSubmit = this.handeSubmit.bind(this)
    }

    handeSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API,{
            method: 'Put',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                ContactID:event.target.ContactId.value,
                ContactName: event.target.ContactName.value,
                MobilePhone: event.target.MobilePhone.value,
                JobTitle: event.target.JobTitle.value,
                BirthDate: event.target.BirthDate.value
            })
        })
        .then(res=>res.json())
        .then(result=>{
            alert(result)
        })
        .catch((error)=>alert("Something went wrong"))
    }


    render() { 
        return (  
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Contact    
                        </Modal.Title>    
                    </Modal.Header>    
                    <Modal.Body> 
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handeSubmit}>
                                    <Form.Group controlId='Contactid' >
                                        <Form.Label>Contact Id</Form.Label>
                                        <Form.Control type="text" name='ContactId' required disabled defaultValue={this.props.contactid}  />
                                    </Form.Group>
                                    <Form.Group controlId='ContactName'>
                                        <Form.Label>Contact Name</Form.Label>
                                        <Form.Control type="text" name='ContactName' required defaultValue={this.props.contactname} />
                                    </Form.Group>
                                    <Form.Group controlId='MobilePhone'>
                                        <Form.Label>Mobile Phone</Form.Label>
                                        <Form.Control type="text" name='MobilePhone' required defaultValue={this.props.mobilephone}/>
                                    </Form.Group>
                                    <Form.Group controlId='JobTitle'>
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control type="text" name='JobTitle' required defaultValue={this.props.jobtitle}  />
                                    </Form.Group>
                                    <Form.Group controlId='BirthDate'>
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control type="text" name='BirthDate' required defaultValue={this.props.birthdate}/>
                                    </Form.Group>

                                    <Form.Group variant='primary'>
                                        <Button  type="submit"> Update Contact</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer variant="danger" onClick={this.props.onHide}>
                        Close
                    </Modal.Footer>
                </Modal> 
        );
    }
}
 
export default EditContact;