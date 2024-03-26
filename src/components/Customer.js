
import { useNavigate, useParams } from "react-router-dom"
import bookingService from "../services/bookingService";
import { useEffect, useState } from "react";
export default function Customer()
{

    const navigate=useNavigate()
    const params=useParams();
    const {id}=params;
    const customerId=id;
    console.log(customerId)

    const[currentBookingExist,setCurrentBookingExist]=useState(false)
    const[currentBooking,setCurrentBooking]=useState()
    const[currentBookingPayment,setCurrentBookingPayment]=useState();
    const[currentBookingDate,setCurrentBookingDate]=useState();

    useEffect(() => {
        const getCurrentBookingExist= () => {
            bookingService.getCustomerCurrentBooking(customerId)
                .then(
                    (resp) => {
                        if (resp.data) {
                            
                            setCurrentBooking(resp.data);
                            setCurrentBookingExist(true);
                            setCurrentBookingPayment(resp.data.payment);
                            setCurrentBookingDate(resp.data.bookingDate);
                        } else {
                            setCurrentBookingExist(false);
                            setCurrentBookingPayment(null); // or handle other default values
                            setCurrentBookingDate(null);
                        }
                    
                  
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );
        };
        getCurrentBookingExist();
    }, [customerId],currentBookingExist); 


    const handleBookCab=()=>{
        navigate(`/booking/${customerId}`)
    }


    const bookingOver=()=>
    {
        bookingService.bookingOverService(customerId,currentBooking.bookingId)
        .then(
            (resp)=>{
                console.log(resp.data);
                setCurrentBookingExist(false);
            }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
    }

    const handleLogout=()=>{
        navigate(`/`)
    }


    return(
        <div>
               <div className="container-fluid">
            <div className="bg-light row">
                <div className="col-8 ps-5 pt-4">
                    <p className="text-start">{customerId}</p>
                </div>
                <div className="col p-4 ps-5">
                    <p className="text-end">
                        <button className="text-brave" onClick={handleLogout}>Logout</button>
                    </p>
                </div>
            </div>
        </div>

                <button onClick={handleBookCab}>Book Cab</button>

                <div>
            {currentBookingExist && (
                <div className="m-5 border border-primary flex-column bd-highlight mb-1">
                    <h2>Your Current Booking</h2>
                    <h4>Note: Click booking over button once you reached your destination to make further booking in future</h4>
                    <div className="p-2 bd-highlight">
                        <p>Booking Id: {currentBooking.bookingId}</p>
                    
                        {/* Uncomment below to format date */}
                         <p>Booking Date: {new Date(currentBooking.bookingDate).toLocaleString()}</p>
                        <p>Booked By: {currentBooking.customerName}</p>
                        <p>Cab Number: {currentBooking.cabNumber}</p>
                        <p>Pickup Point: {currentBooking.pickUpLocation}</p>
                        <p>Drop Point: {currentBooking.dropLocation}</p>
                        {/* <p>Fare: {currentBookingPayment.paidAmount}</p>  */}
                        <button onClick={bookingOver} >Booking Over</button>
                    </div>
                </div>
            )}
        </div>
        </div>
       
    )
}