import { useEffect, useState } from "react";
import cabAgencyService from "../services/cabAgencyService";
import bookingService from "../services/bookingService";
import AvailableCabs from "../screens/AvailableCabs";
import  Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Booking()
{
    const[availableCabs,setAvailableCabs]=useState([])
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    
    const[availableCabsByLocation,setAvailableCabsByLocation]=useState([])
    

    const params=useParams();
    const {id}=params;
    const customerId=id;

    const navigate=useNavigate();

    useEffect(() => {
        const getAvailableCabs = () => {
            bookingService.getAvailableCabsService()
                .then(
                    (resp) => {
                    console.log(resp.data); 
                    setAvailableCabs(resp.data) 
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );
        };
        getAvailableCabs();
    }, []); 

    const handleCabBooking=(cab)=>{

        navigate(`/payment/${customerId}`,{state:{cab:cab}})
    }

    const searchByLocation = () => {
        // Handle search by location logic
        bookingService.searchByLocation(fromLocation,toLocation)
        .then(
            (resp)=>{
                console.log(resp.data);
                setAvailableCabsByLocation(resp.data);
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
        console.log('Searching by location...');
        console.log('From Location:', fromLocation);
        console.log('To Location:', toLocation);
    };


    return(
        // <div>
        //     <h1>Welcome to Booking</h1>
        //     <div>
        //     <Row >
        //         {availableCabs.map((availableCab)=>(
                    
        //             <Col key={availableCab.id}>
                        
        //                 <AvailableCabs cab={availableCab}></AvailableCabs>
        //             </Col>
        //         ))}
        //     </Row>
        // </div>


        // </div>
        <div>
            
            <div className="m-5 p-2 container overflow-hidden">
            <div className="row gy-3">
                <div className="col ">
                    <form>
                        <label htmlFor="fromLocation">From Location:</label>
                        <input type="text" name="fromLocation" id="fromLocation" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} />

                        <label htmlFor="toLocation">To Location:</label>
                        <input type="text" name="toLocation" id="toLocation" value={toLocation} onChange={(e) => setToLocation(e.target.value)} />

                        <button type="button" onClick={searchByLocation}>Search</button>
                    </form>
                </div>
            </div>
        </div>

        <div>
                    {availableCabsByLocation.map((cab) => (
                        <div key={cab.vehicleNumber} className="m-5 border border-primary flex-column bd-highlight mb-1">
                            <div className="p-2 bd-highlight">
                                <p>Cab Vehicle Number: {cab.vehicleNumber}</p>
                                <p>Cab Model: {cab.cabModel}</p>
                                <p>Number Of Seats: {cab.numberOfSeats}</p>
                                <p>Pickup Point: {cab.pickUpPoint}</p>
                                <p>Drop Point: {cab.dropPoint}</p>
                                <p>Fare: {cab.fair}</p>
                                <button onClick={() => handleCabBooking(cab)}>Book Cab</button>
                            </div>
                        </div>
                    ))}
                </div>

            <div>
                {availableCabs.map((cab) => (
                    <div key={cab.cabId} className="m-5 border border-primary flex-column bd-highlight mb-1">
                        <div className="p-2 bd-highlight">
                            <p>Cab Vehicle Number: {cab.vehicleNumber}</p>
                            <p>Cab Model: {cab.cabModel}</p>
                            <p>Number Of Seats: {cab.numberOfSeats}</p>
                            <p>Pickup Point: {cab.pickUpPoint}</p>
                            <p>Drop Point: {cab.dropPoint}</p>
                            <p>Fare: {cab.fair}</p>
                            <button onClick={()=>handleCabBooking(cab)}>Book cab</button>
                        </div>
                    </div>
                ))}
            </div>
       
    </div>
    )
}