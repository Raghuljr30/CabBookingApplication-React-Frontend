import { useLocation } from "react-router-dom";
export default function ViewProfile()
{
    const { state } = useLocation();
    const cabAgencyDetail = state ? state.cabAgencyDetail : null;
    console.log(cabAgencyDetail)
    return(
        <div className="container mt-4" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            Profile Information
                            {/* <button type="button" className="btn-close" aria-label="Close" onClick={closeProfile}>X</button> */}
                        </div>
                        <div className="card-body">
                            <p><strong>ID:</strong> {cabAgencyDetail.cabAgencyId}</p>
                            <p><strong>Name:</strong> {cabAgencyDetail.cabAgencyName}</p>
                            <p><strong>Email:</strong> {cabAgencyDetail.cabAgencyEmail}</p>
                            <p>
                                <strong>Mobile Number:</strong> {cabAgencyDetail.cabAgencyMobileNumber}
                                {/* <button className="btn btn-primary ms-2" onClick={() => functionToBePerformed('changeMobileNumber')}>Change Mobile Number</button> */}
                            </p>
                            <p>
                                <strong>Password:</strong> <span className="password-mask">{cabAgencyDetail.cabAgencyPassword}</span>
                                {/* <button className="btn btn-primary ms-2" onClick={() => functionToBePerformed('changePassword')}>Change Password</button> */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}