import { useEffect, useState } from "react"
import cabAgencyService from "../services/cabAgencyService";
import { useNavigate, useParams } from "react-router-dom";

import  Row  from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AllCab from "../screens/AllCab";
import AllDriver from "../screens/AllDriver";
import { Navbar, Nav, NavDropdown ,Button} from 'react-bootstrap';
export default function CabAgency()
{
    const params=useParams();
    const {id}=params;
    const cabAgencyId=id;
    console.log("template variabe"+cabAgencyId)

    const[cabAgencyDetail,setCabAgencyDetail]=useState();
    const[cabAgencyName,setCabAgencyName]=useState('')
    const[cabs,setCabs]=useState([]);
    const[drivers,setDrivers]=useState([]);
    const[unBookedCabs,setUnBookedCabs]=useState([]);
    const[bookedCabs,setBookedCabs]=useState([]);
    const[currentBookedCabs,setCurrentBookedCabs]=useState([]);
    

    

    const navigate=useNavigate();

    const [displayAllCabs, setDisplayAllCabs] = useState(false);
    const [displayUnbookedCabs, setDisplayUnbookedCabs] = useState(false);
    const [displayBookedCabs, setDisplayBookedCabs] = useState(false);
    const [displayCurrentBookedCabs, setDisplayCurrentBookedCabs] = useState(false);


    useEffect(() => {
        const getCabAgencyDetails = () => {
          
            cabAgencyService.getCabAgencyDetailsService(cabAgencyId)
                .then(
                    (resp) => {
                    console.log(resp.data.cabAgencyName);
                    setCabAgencyName(resp.data.cabAgencyName)
                    setCabAgencyDetail(resp.data)
                    setDisplayAllCabs(true);

                  
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );
        };
        getCabAgencyDetails();
    }, []); 

    console.log(cabs)
    

    function handleAddCab(){
        cabAgencyService.addCabsToCabAgency(cabAgencyId)
        .then(
            (resp)=>{
                console.log(resp.data);
                setCabs(resp.data.cabs);
                setDisplayBookedCabs(false);
                setDisplayUnbookedCabs(false);
                setDisplayCurrentBookedCabs(false);
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    

    function handleAddDriver()
    {
        cabAgencyService.addDriversToCabAgency(cabAgencyId)
        .then(
            (resp)=>{
                console.log(resp);
                setDrivers(resp.data.drivers)
            }
        )
        .catch(
            (err)=>{
                console.log()
            }
        )
    }

    function handleUnBookedCabs()
    {
        cabAgencyService.getUnBookedCabs(cabAgencyId)
        .then(
            (resp)=>{
                console.log(resp.data);
                setUnBookedCabs(resp.data)
                setDisplayUnbookedCabs(true);
                setDisplayBookedCabs(false);
                setDisplayAllCabs(false);
                setDisplayCurrentBookedCabs(false);

            }
        )
        .catch(
            (err)=>{
                console.log(err.response.data)
            }
        )
    }

    function handleBookedCabs()
    {
        cabAgencyService.getBookedCabs(cabAgencyId)
        .then(
            (resp)=>{
                console.log(resp.data)
                setBookedCabs(resp.data);
                setDisplayBookedCabs(true);
                setDisplayUnbookedCabs(false);
                setDisplayAllCabs(false);
                setDisplayCurrentBookedCabs(false);
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    function handleAllCurrentBookedCabs()
    {
        cabAgencyService.getAllCurrentlyBookedCabs(cabAgencyId)
        .then(
            (resp)=>{
                console.log(resp.data);
                setCurrentBookedCabs(resp.data);
                setDisplayCurrentBookedCabs(true);
                setDisplayBookedCabs(false);
                setDisplayUnbookedCabs(false);
                setDisplayAllCabs(false);
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )   
    }

    function viewProfile()
    {
        navigate(`/view-profile/${cabAgencyId}`,{state:{cabAgencyDetail:cabAgencyDetail}});
    }

    function editProfile()
    {
        navigate(`/edit-profile/${cabAgencyId}`,{state:{cabAgencyDetail:cabAgencyDetail}});
    }

    function handleLogout()
    {
        cabAgencyService.logoutService()
        .then(
            (resp)=>{
                console.log(resp);
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        )
        // navigate(`/`)
    }

    


   


    return(

        <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>{cabAgencyName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Cabs" id="cabs-dropdown">
                        <NavDropdown.Item onClick={handleUnBookedCabs}>Unbooked Cabs</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleBookedCabs}>Booked Cabs</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleAllCurrentBookedCabs}>Currently Booked Cabs</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Profile" id="profile-dropdown">
                        <NavDropdown.Item onClick={viewProfile}>View Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={editProfile}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <div className="container mt-3">
            
            <Button variant="primary" onClick={handleAddCab}>Add Cab</Button>
            <Button variant="primary" onClick={handleAddDriver}>Add Driver</Button>
        </div>

        <div className="row">
            {displayAllCabs && cabs.map((cab) => (
                <div key={cab.cabId} className="col-4">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="p-2 flip-card-front">
                                <p className="text-start">Vehicle Number: {cab.vehicleNumber}</p>
                                <p className="text-start">Vehicle Id: {cab.cabId}</p>
                                <p className="text-start">Vehicle Pickup Point: {cab.pickUpPoint}</p>
                                <p className="text-start">Vehicle Drop Point: {cab.dropPoint}</p>
                                {cab.availability ? <p className="text-start">Vehicle Booked: No</p> : <p className="text-start">Vehicle Booked: Yes</p>}
                            </div>
                            {cab.driver && (
                                <div className="p-2 flip-card-back">
                                    <p className="text-start">Driver Id: {cab.driver.driverId}</p>
                                    <p className="text-start">Driver Name: {cab.driver.driverName}</p>
                                    <p className="text-start">Driver License Number: {cab.driver.licenseNumber}</p>
                                    <p className="text-start">Driver Email: {cab.driver.driverEmail}</p>
                                    <p className="text-start">Driver Mobile Number: {cab.driver.driverMobileNumber}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="row">
                {displayUnbookedCabs
                    ? unBookedCabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                               <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="p-2 flip-card-front">
                                <p className="text-start">Vehicle Number: {cab.vehicleNumber}</p>
                                <p className="text-start">Vehicle Id: {cab.cabId}</p>
                                <p className="text-start">Vehicle Pickup Point: {cab.pickUpPoint}</p>
                                <p className="text-start">Vehicle Drop Point: {cab.dropPoint}</p>
                                {cab.availability ? <p className="text-start">Vehicle Booked: No</p> : <p className="text-start">Vehicle Booked: Yes</p>}
                            </div>
                            {cab.driver && (
                                <div className="p-2 flip-card-back">
                                    <p className="text-start">Driver Id: {cab.driver.driverId}</p>
                                    <p className="text-start">Driver Name: {cab.driver.driverName}</p>
                                    <p className="text-start">Driver License Number: {cab.driver.licenseNumber}</p>
                                    <p className="text-start">Driver Email: {cab.driver.driverEmail}</p>
                                    <p className="text-start">Driver Mobile Number: {cab.driver.driverMobileNumber}</p>
                                </div>
                            )}
                        </div>
                    </div>
                        </div>
                    ))
                    : unBookedCabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                      
                        </div>
                    ))}
            </div>


            <div className="row">
                {displayBookedCabs
                    ? bookedCabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                                <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="p-2 flip-card-front">
                                <p className="text-start">Vehicle Number: {cab.vehicleNumber}</p>
                                <p className="text-start">Vehicle Id: {cab.cabId}</p>
                                <p className="text-start">Vehicle Pickup Point: {cab.pickUpPoint}</p>
                                <p className="text-start">Vehicle Drop Point: {cab.dropPoint}</p>
                                {cab.availability ? <p className="text-start">Vehicle Booked: No</p> : <p className="text-start">Vehicle Booked: Yes</p>}
                            </div>
                            {cab.driver && (
                                <div className="p-2 flip-card-back">
                                    <p className="text-start">Driver Id: {cab.driver.driverId}</p>
                                    <p className="text-start">Driver Name: {cab.driver.driverName}</p>
                                    <p className="text-start">Driver License Number: {cab.driver.licenseNumber}</p>
                                    <p className="text-start">Driver Email: {cab.driver.driverEmail}</p>
                                    <p className="text-start">Driver Mobile Number: {cab.driver.driverMobileNumber}</p>
                                </div>
                            )}
                        </div>
                    </div>
                        </div>
                    ))
                    : bookedCabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                       
                        </div>
                    ))}
            </div>


            <div className="row">
                {displayCurrentBookedCabs
                    ? currentBookedCabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                                <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="p-2 flip-card-front">
                                <p className="text-start">Vehicle Number: {cab.vehicleNumber}</p>
                                <p className="text-start">Vehicle Id: {cab.cabId}</p>
                                <p className="text-start">Vehicle Pickup Point: {cab.pickUpPoint}</p>
                                <p className="text-start">Vehicle Drop Point: {cab.dropPoint}</p>
                                {cab.availability ? <p className="text-start">Vehicle Booked: No</p> : <p className="text-start">Vehicle Booked: Yes</p>}
                            </div>
                            {cab.driver && (
                                <div className="p-2 flip-card-back">
                                    <p className="text-start">Driver Id: {cab.driver.driverId}</p>
                                    <p className="text-start">Driver Name: {cab.driver.driverName}</p>
                                    <p className="text-start">Driver License Number: {cab.driver.licenseNumber}</p>
                                    <p className="text-start">Driver Email: {cab.driver.driverEmail}</p>
                                    <p className="text-start">Driver Mobile Number: {cab.driver.driverMobileNumber}</p>
                                </div>
                            )}
                        </div>
                    </div>
                        </div>
                    ))
                    : cabs.map((cab) => (
                        <div key={cab.cabId} className="col-4">
                            {/* Cab card content as before */}
                        </div>
                    ))}
            </div>
    </div>
        
        
    )
}