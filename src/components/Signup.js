import React, { useState } from "react";
import { Form, Button, Container, Row, Col,Alert } from 'react-bootstrap';
import cabAgencyService from "../services/cabAgencyService";
import { Navigate } from "react-router-dom";
import { Route, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { render } from "@testing-library/react";
import customerService from "../services/customerService";

export default function Signup() {


    const navigate=useNavigate();
    const params=useParams();
    const {role}=params;
    const roleof=role
    console.log(role);
    const [signupCabAgency, setSignupCabAgency] = useState(roleof === "cabagency");
    const [signupCustomer, setSignupCustomer] = useState(roleof !== "cabagency");
   
    

    const [cabAgencyName, setCabAgencyName] = useState('');
    const [cabAgencyMobileNumber, setCabAgencyMobileNumber] = useState('');
    const [cabAgencyEmail, setCabAgencyEmail] = useState('');
    const [cabAgencyPassword, setCabAgencyPassword] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    const[signupError,setSignupError]=useState(false);
    const[signupErrorMessage,setSignupErrorMessage]=useState([]);

    const [customer,setCustomer]= useState({ name: '', email: '', password: '', mobileNumber: '' });


   

    const handleCabAgencySignup = (e) => {
        e.preventDefault();
       

        if (cabAgencyMobileNumber.length !== 10) {
            setMobileNumberError("Mobile number must be 10 digits long.");
            return;
        } 
        const newCabAgency={cabAgencyName,cabAgencyEmail,cabAgencyPassword,cabAgencyMobileNumber}
        cabAgencyService.registerCabAgency(newCabAgency)
        .then(
            (resp)=>{
                console.log(resp);
                console.log("navigate");

                navigate(`/signup-success/${"cabagency"}`,{state:{data:resp.data}})
            
                // navigate(`/login/${"cabagency"}`)
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )

        console.log(cabAgencyName+" "+cabAgencyEmail+" "+cabAgencyMobileNumber+" "+ cabAgencyPassword);
    }

    const handleCustomerSignup=(e)=>{
      
        console.log(customer);
        customerService.registerCustomer(customer)
        .then(
            (resp)=>{
                console.log(resp.data)
                navigate(`/login/${"customer"}`)
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )
        
    }


    
   
      
            return (
                
    
                <Container className="pt-3">
                     {signupError && (
                    <Alert variant="danger">
                        {Array.isArray(signupErrorMessage) ? 
                            signupErrorMessage.map((errorMessage, index) => (
                                <p key={index}>{errorMessage}</p>
                            )) : 
                            <p>{JSON.stringify(signupErrorMessage.cabAgencyPassword)}</p>
                        }
                    </Alert>
                )} 

               { signupCabAgency? (
                <div> <Row>
                <Col xs={4}></Col>
                <Col xs={4} className="pt-5">
                    <h2>Cab Agency Registration</h2>
                    <Form id="form-driver-signup" onSubmit={handleCabAgencySignup}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cab Agency name</Form.Label>
                            <Form.Control type="text" required value={cabAgencyName} 
                        onChange={(e) => setCabAgencyName(e.target.value)} 
                        />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cab Agency MobileNumber</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                pattern="[0-9]{10}"
                                title="Please enter a 10-digit mobile number (0-9) without spaces or special characters"
                                value={cabAgencyMobileNumber}
                                onChange={(e) => setCabAgencyMobileNumber(e.target.value)}
                            />
                            {mobileNumberError && <div className="text-danger">{mobileNumberError}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cab Agency Email</Form.Label>
                            <Form.Control type="email" required value={cabAgencyEmail} onChange={(e) => setCabAgencyEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cab Agency Password</Form.Label>
                            <Form.Control type="password" required value={cabAgencyPassword} onChange={(e) => setCabAgencyPassword(e.target.value)} />
                        </Form.Group> 

                        <Button type="submit" variant="primary">Register</Button>
                    </Form>
                </Col>
            </Row>
                </div>
            ):     
            <Row>
                        <Col xs={4}></Col>
                        <Col xs={4} className="pt-4">
                            <h1>Customer Signup</h1>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control type="text" name="customerName" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Email</Form.Label>
                                    <Form.Control type="text" name="customerEmail" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Password</Form.Label>
                                    <Form.Control type="password" name="customerPassword" value={customer.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Customer Mobile Number</Form.Label>
                                    <Form.Control type="text" name="customerMobileNumber" value={customer.mobileNumber} onChange={(e) => setCustomer({ ...customer, mobileNumber: e.target.value })} />
                                </Form.Group>
                                <Button variant="primary" onClick={() => handleCustomerSignup()}>Signup</Button>
                            </Form>
                        </Col>
                    </Row>
}    
                </Container>
            );
               }
        

    
        
            
       
    

   

