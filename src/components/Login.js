import React, { useState } from "react";
import { Form, Button, Container, Row, Col,Alert } from 'react-bootstrap';
import cabAgencyService from "../services/cabAgencyService";
import { Route,useNavigate } from "react-router-dom";
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import customerService from "../services/customerService";

export default function Login() {
   
    const params=useParams();
    const {role}=params;
    const roleof=role
    console.log(role);

    const[loginRole,setLoginRole]=useState(roleof)

    console.log(loginRole);

    const [cabAgencyId,setCabAgencyId]=useState('')
    const [cabAgencyEmail, setCabAgencyEmail] = useState('');
    const [cabAgencyPassword, setCabAgencyPassword] = useState('');

    const [customerId,setCustomerId]=useState()
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPassword, setCustomerPassword] = useState('');

    const[loginError,setLoginError]=useState(false);
    const[loginErrorMessage,setLoginErrorMessage]=useState('');

    const [loginCabAgency, setLoginCabAgency] = useState(roleof === "cabagency");
    const [loginCustomer, setLoginCustomer] = useState(roleof !== "cabagency");

  
    const navigate=useNavigate();

    const  handleCabAgencyLogin= (e) => {
        e.preventDefault();
        console.log("login cabagency buton clicked");
        const loginCabAgency={cabAgencyId,cabAgencyEmail,cabAgencyPassword}
        cabAgencyService.loginCabAgency(loginCabAgency)
        .then(
            (resp)=>{
                console.log(resp);
                if(resp.data==true)
                {
                    navigate(`/cabagency/${cabAgencyId}`);
                }
                else
                {   
                    setLoginError(true);
                    setLoginErrorMessage("Invalid Email or Password");
                }
            }
        )
        .catch(
            (err)=>{
                console.log(err.response.data)
                setLoginError(true);
                setLoginErrorMessage(err.response.data)
            }
        )

        console.log(cabAgencyId+" " +cabAgencyEmail+ " "+ cabAgencyPassword);
    }


    const handleCustomerLogin=(e)=>{
        e.preventDefault();
        const loginCustomer={customerId,customerEmail,customerPassword};
        
        customerService.loginCustomer(loginCustomer)
        .then(
            (resp)=>{
                console.log(resp.data);
                if(resp.data==true)
                {
                    navigate(`/customer/${customerId}`);
                }
            }
        )
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }
    // bookedCabs.map((cab) => (
    //     <div key={cab.cabId} className="col-4">
       
    //     </div>
    // ))}

   

            return (
          
                    <Container className="pt-3">
                
                    {loginError && (
                    <Alert variant="danger">
                        {Array.isArray(loginErrorMessage) ? 
                            loginErrorMessage.map((errorMessage, index) => (
                                <p key={index}>{errorMessage}</p>
                            )) : 
                            <p>{JSON.stringify(loginErrorMessage)}</p>
                        }
                        
                    </Alert>
                )}      
                
                
            {loginCabAgency? (
                <div>
                 <Row>
                            <Col xs={4}></Col>
                            <Col xs={4} className="pt-5">
                                <h2>Login</h2>
                                <Form id="form-driver-login" onSubmit={handleCabAgencyLogin}>
            
                                <Form.Group className="mb-3">
                                        <Form.Label>Cab Agency Id</Form.Label>
                                        <Form.Control type="number" required value={cabAgencyId} onChange={(e) => setCabAgencyId(e.target.value)} />
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
                    <Col xs={4} className="pt-5">
                        <h2>Customer</h2>
                        <Form id="form-driver-login" onSubmit={handleCustomerLogin}>
    
                        <Form.Group className="mb-3">
                                <Form.Label>Customer Id</Form.Label>
                                <Form.Control type="number" required value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                            </Form.Group>
                           
                            <Form.Group className="mb-3">
                                <Form.Label> Email</Form.Label>
                                <Form.Control type="email" required value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" required value={customerPassword} onChange={(e) => setCustomerPassword(e.target.value)} />
                            </Form.Group> 
    
                            <Button type="submit" variant="primary">Login</Button>
                        </Form>
                    </Col>
                </Row>
        
        }          
                        
                        
                    </Container>
          
          
              
            );
        
        
            return(
                <Container className="pt-3">
                
            </Container>
            )

        
        
    

    
}
