import { useLocation } from "react-router-dom";
import { useState } from "react";
import cabAgencyService from "../services/cabAgencyService";
export default function EditProfile()
{
    const { state } = useLocation();
    const cabAgencyDetail = state ? state.cabAgencyDetail : null;

    const [newMobileNumber, setNewMobileNumber] = useState('');
    const [showMobileForm, setShowMobileForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false);
   

    const handleMobileNumberEdit = () => {
        setShowMobileForm(true);
        setShowPasswordForm(false);
        
    };


    const validateMobileNumber = (mobileNumber) => {
        const errors = {};

        if (!mobileNumber) {
            errors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = 'Mobile number must be exactly 10 digits';
        }

        return errors;
    };

    const handleMobileNumberSubmit = (e) => {
        e.preventDefault();
        // Perform mobile number update logic here
        // Assuming the update is successful
        const validationErrors = validateMobileNumber(newMobileNumber);

        if (Object.keys(validationErrors).length === 0) {
            const newMobileNumberObject={newMobileNumber}
            cabAgencyService.updateMobileNumberService(cabAgencyDetail.cabAgencyId,newMobileNumberObject)
            .then(
                (resp)=>{
                    console.log(resp.data);
                    setSuccessMessage('Mobile number updated successfully');
                }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
          
            setErrors({});

        } else {
            setErrors(validationErrors);
            setSuccessMessage("");
        }

       

        
    };

    const handlePasswordEdit = () => {
        setShowPasswordForm(true);
        setShowMobileForm(false);
        setSuccessMessage("");
    };

    const validatePasswordUpdate = () => {
        const errors = {};

        if (newPassword.length < 6) {
            errors.newPassword = 'Password must be at least 6 characters';
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validatePasswordUpdate();

        if (Object.keys(validationErrors).length === 0) {
            
            const cabAgencyNewPassword={newPassword}
            cabAgencyService.updatePasswordService(cabAgencyDetail.cabAgencyId,cabAgencyNewPassword)
            .then(
                (resp)=>{
                    console.log(resp.data);
                }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
            setSuccessMessage('Password updated successfully');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    

    return(
       
//         <div>
          

// <div className="container mt-4">
//         <div className="row justify-content-center">
//             <div className="col-md-8">
//                 <div className="card">
//                     <div className="card-header">
//                         Edit Profile
//                         {/* <button type="button" className="btn-close" aria-label="Close" onClick={closeEditProfile}>X</button> */}
//                     </div>
//                     <div className="card-body">
//                         <p><strong>ID:</strong> {cabAgencyDetail.cabAgencyId}</p>
//                         <p><strong>Name:</strong> {cabAgencyDetail.cabAgencyName}</p>
//                         <p><strong>Email:</strong> {cabAgencyDetail.cabAgencyEmail}</p>

//                         <strong>Mobile Number:</strong> {cabAgencyDetail.cabAgencyMobileNumber}
//                         <button className="btn ms-1" onClick={handleMobileNumberEdit}>
//                             <img src="assets/edit.png" height="30" className="d-inline-block align-top" alt="Cab Logo" />
//                         </button><br></br>
// {/* 
//                         {mobileNumberUpdateSuccess && (
//                             <div className="alert alert-success mt-3">
//                                 Mobile Number updated successfully! Go to Profile to view the changes
//                             </div>
//                         )} */}

//                         <strong>Password:</strong> <span className="password-mask">{cabAgencyDetail.cabAgencyPassword}</span>
//                         <button className="btn ms-1 mt-2" onClick={handlePasswordEdit} >
//                             <img src="assets/edit.png" height="30" className="d-inline-block align-top" alt="Cab Logo" />
//                         </button>

//                         {/* {passwordUpdateSuccess && (
//                             <div className="alert alert-success mt-3">
//                                 Password updated successfully! Go to Profile to view the changes
//                             </div>
//                         )} */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <div>
//                {showMobileForm && (
//                  <form onSubmit={handleMobileNumberSubmit}>
//                      <label htmlFor="mobileNumber">New Mobile Number:</label>
//                      <input type="text" id="mobileNumber" value={newMobileNumber} onChange={(e) => setNewMobileNumber(e.target.value)} />
//                    {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
//                      <button type="submit">Submit</button>
//                 </form>
//              )}
//              {successMessage && <p>{successMessage}</p>}
//             </div>

//             <div>
//                  {showPasswordForm && (
//                  <form onSubmit={handlePasswordSubmit}>
//                      <label htmlFor="newPassword">New Password:</label>
//                      <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                      {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}
//                      <label htmlFor="confirmPassword">Confirm New Password:</label>
//                      <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                      {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
//                      <button type="submit">Submit</button>
//                  </form>
//              )}
//              {successMessage && <p>{successMessage}</p>}
//             </div>
//         </div>

<div className="container mt-4">
<div className="row justify-content-center">
    <div className="col-md-8">
        <div className="card">
            <div className="card-header">
                Edit Profile
            </div>
            <div className="card-body">
                <p><strong>ID:</strong> {cabAgencyDetail.cabAgencyId}</p>
                <p><strong>Name:</strong> {cabAgencyDetail.cabAgencyName}</p>
                <p><strong>Email:</strong> {cabAgencyDetail.cabAgencyEmail}</p>
                <strong>Mobile Number:</strong> {cabAgencyDetail.cabAgencyMobileNumber}
                <button className="btn ms-1" onClick={handleMobileNumberEdit}>
                    <img src="assets/edit.png" height="30" className="d-inline-block align-top" alt="Cab Logo" />
                </button><br />
                <strong>Password:</strong> <span className="password-mask">{cabAgencyDetail.cabAgencyPassword}</span>
                <button className="btn ms-1 mt-2" onClick={handlePasswordEdit}>
                    <img src="assets/edit.png" height="30" className="d-inline-block align-top" alt="Cab Logo" />
                </button>
            </div>
        </div>
    </div>
</div>
<div className="row justify-content-center mt-4">
    <div className="col-md-6">
        <div className="form-container">
            {showMobileForm && (

                <div>
                    <form onSubmit={handleMobileNumberSubmit}> 
                    <label htmlFor="mobileNumber">New Mobile Number:</label>
                    <input type="text" id="mobileNumber" value={newMobileNumber} onChange={(e) => setNewMobileNumber(e.target.value)} />
                    <button type="submit">Submit</button>
                    {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
                   
                </form>
                {successMessage && <p>{successMessage}</p>}
                </div>
              
            )}
           
            {showPasswordForm && (
                <div>
                    <form onSubmit={handlePasswordSubmit}>
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}<br></br>
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br></br>
                    <button type="submit">Submit</button><br></br>
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                    
                </form>
                {successMessage && <p>{successMessage}</p>}
                    </div>
                
                 
            )}
         
        </div>
    </div>
</div>
</div>
);
        
      
    
}