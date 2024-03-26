

export default function AllCab({cab,driver})
{
   
    console.log(cab)
    console.log(driver)
    return(
        <div>
            <h4>{cab.cabId}</h4>
            <h4>{cab.cabModel}</h4>
            <h4>{cab.vehicleNumber}</h4>
            <h4>{cab.pickUpPoint}</h4>
            <h4>{cab.dropPoint}</h4>
            <h4>{cab.fair}</h4>
        </div>

        
    )
}

