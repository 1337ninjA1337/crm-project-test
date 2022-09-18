import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.handeSubmit = this.handeSubmit.bind(this)

        this.state={
            MobilePhone:"",
            MobilePhoneDirty: false,
            MobileError: "This field can not be empty",
            BirthDate:"",
            BirthDateDirty: false,
            BirthDateError: "Please enter date in correct format (year-day-month)",
            FormButtonDisabled: true
        }
    }

    handeSubmit(event){

        let birthDate = new Date(event.target.BirthDate.value)

        if(this.state.MobileError==="" && this.state.BirthDateError===""){
            console.log("aboba");
            event.preventDefault();
            fetch(process.env.REACT_APP_API,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    ContentID:null,
                    ContactName: event.target.ContactName.value,
                    MobilePhone: event.target.MobilePhone.value,
                    JobTitle: event.target.JobTitle.value,
                    BirthDate: birthDate
                })
            })
            .then(res=>res.json())
            .then(result=>{
                alert(result)
            })
            .catch((error)=>alert("Something went wrong"))
        }  
    }

    blurHandler(e){
        switch(e.target.name){
            case 'MobilePhone':
                this.setState({MobilePhoneDirty: true})
                break
            case 'BirthDate':
                this.setState({BirthDateDirty: true})
                break
        }

        if(this.state.MobileError === "" && this.state.BirthDateError === "") {
            this.setState({FormButtonDisabled: false})
        }
    }

    phoneHandler(e){
        this.setState({MobilePhone: e.target.value})
        let re = /[0-9]{7}/
        if(!re.test(String(this.state.MobilePhone))){
            this.setState({MobileError: "Phone should contain 7 digits"})
        } else this.setState({MobileError: ""})
    }

    birthDateHandler(e){
        this.setState({BirthDate: e.target.value})

        let re = /^\d{4}[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/;

        if(re.test(String(this.state.BirthDate).toLocaleLowerCase()) || this.state.BirthDate === "" ){
            this.setState({BirthDateError: ""})
        }  else this.setState({BirthDateError: "Please enter date in correct format (year-day-month)"})
    }

    render() { 
        return (  
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Contact    
                        </Modal.Title>    
                    </Modal.Header>    
                    <Modal.Body> 
                        <Row>
                            <Col sm={6}>
                                <Form className="d-flex flex-column justify-content-center " onSubmit={this.handeSubmit}>
                                    <Form.Group controlId='ContactName'>
                                        <Form.Label>Contact Name</Form.Label>
                                        <Form.Control type="text" name='ContactName' required placeholder="Contact Name" />
                                    </Form.Group>
                                    <Form.Group controlId='MobilePhone'>
                                        <Form.Label >Mobile Phone</Form.Label>
                                        {
                                            (this.state.MobilePhoneDirty && this.state.MobileError) && <Form.Label className='text-danger ms-3' >{this.state.MobileError}</Form.Label>
                                        }
                                        <Form.Control type="text" name='MobilePhone' required placeholder="Mobile Phone" value={this.state.MobilePhone} onChange={e=>this.phoneHandler(e)} onBlur={e=>this.blurHandler(e)} />
                                    </Form.Group>
                                    <Form.Group controlId='JobTitle'>
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control type="text" name='JobTitle'  placeholder="JobTitle" />
                                    </Form.Group>
                                    <Form.Group controlId='BirthDate'>
                                        <Form.Label>Birth Date</Form.Label>
                                        {
                                            (this.state.BirthDateDirty && this.state.BirthDateError) && <Form.Label className='text-danger ms-3' >{this.state.BirthDateError}</Form.Label>
                                        }
                                        <Form.Control type="text" name='BirthDate' placeholder="Birth Date" value={this.state.BirthDate} onChange={e=>this.birthDateHandler(e)} onBlur={e=>this.blurHandler(e)} />
                                    </Form.Group>

                                    <Form.Group variant='primary' className="mt-3" >
                                        <Button disabled={this.state.FormButtonDisabled} type='submit'> Add Contact</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal> 
        );
    }
}
 
export default AddContact;