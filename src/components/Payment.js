import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import bookingService from '../services/bookingService';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Payment()
{
    const navigate=useNavigate()

    const { state } = useLocation();
    const cab = state ? state.cab : null;

    

    const[paymentType,setPaymentType]=useState('');
    const paymentTypes = ['Cash', 'Card', 'UPI'];

    const params=useParams();
    const {id}=params;
    const customerId=id;    


    function makePayment()
    {
        console.log("make payment");

        console.log(paymentType)
        bookingService.bookCab(customerId,cab.cabId,paymentType)
        .then(
            (resp)=>{
                console.log(resp)
                navigate(`/customer/${customerId}`)
                
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )


    }

    return (
        <div>
            <h1>Payment Details</h1>
            {cab && (
                
          
                    <Container className="mt-5">
                        <Row>
                            <Col md={{ span: 4, offset: 4 }}>
                                <div>
                                    <h4>Payment</h4>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Cab Id</Form.Label>
                                            <Form.Control type="text" value={cab.vehicleNumber} readOnly />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Vehicle Number</Form.Label>
                                            <Form.Control type="text" value={cab.agencyName} readOnly />
                                        </Form.Group>


                                         <Form.Group className="mb-3">
                                            <Form.Label>Vehicle Number</Form.Label>
                                            <Form.Control type="text" value={cab.pickUpPoint} readOnly />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Agency Name</Form.Label>
                                            <Form.Control type="text" value={cab.dropPoint} readOnly />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Pickup Point</Form.Label>
                                            <Form.Control type="text" value={cab.fair} readOnly />
                                        </Form.Group>

                                        
                                        <Form.Group className="mb-3">
                                        <Form.Label>Payment Type</Form.Label>
                                        <Form.Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                        <option value="">Select Payment Type</option>
                                        {paymentTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                        ))}
                                        </Form.Select>
                                        </Form.Group>
                                        <Button variant="primary" onClick={makePayment} >Pay</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
              

            )}
        </div>
    );
}