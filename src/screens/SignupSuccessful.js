import { useLocation } from "react-router-dom";
export default function SignupSuccessful(){

    const { state } = useLocation();
    const data = state ? state.data : null;
    return(
        <div>
        <h1>Your Credentials:{data.cabAgencyId}</h1>    
        <a href={`/login/${"cabagency"}`}>Click here to login as cabagency</a>
        </div>
    )
}