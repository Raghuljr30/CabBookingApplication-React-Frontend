import { useParams } from "react-router-dom";
import bookingService from "../services/bookingService";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";
export default function AvailableCabs({cab})
{
   
    console.log(cab)
    const params=useParams();
    const {id}=params;
    const customerId=id;

    const navigate=useNavigate();
    const handleCabBooking=()=>{

        navigate(`/payment/${customerId}`,{state:{cab:cab}})
    }


    return(
        <div>
            <h3>{cab.cabId}</h3>
            <h3>{cab.cabModel}</h3>
            <h3>{cab.ac}</h3>
            <h3>{cab.numberOfSeats}</h3>
            <h3>{cab.vehicleNumber}</h3>
            <h3>{cab.pickUpPoint}</h3>
            <h3>{cab.dropPoint}</h3>
            <h3>{cab.fair}</h3>
            <button onClick={handleCabBooking}></button>

        </div>
        
        
    )
   
}
