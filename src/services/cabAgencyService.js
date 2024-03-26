import { axiosInstance } from "./axios-http-client";
class cabAgencyService {

    registerCabAgency(newCabAgency) {
        console.log("register Cab Agency");
        return axiosInstance.post('http://localhost:8080/cabagency',newCabAgency);
    }

    loginCabAgency(loginCabAgency)
    {
        console.log("login cab agency");
        return axiosInstance.post('http://localhost:8080/cabagency/login',loginCabAgency);

    }

    getCabAgencyDetailsService(cabAgencyId)
    {
        console.log("get cab agency details");
        return axiosInstance.get(`http://localhost:8080/cabagency/${cabAgencyId}`)
    }

    addCabsToCabAgency(cabAgencyId)
    {
        return axiosInstance.patch(`http://localhost:8080/cabagency/cabs/${cabAgencyId}`)   
    }

    addDriversToCabAgency(cabAgencyId)
    {
        return axiosInstance.patch(`http://localhost:8080/cabagency/drivers/${cabAgencyId}`)   
    }

    getUnBookedCabs(cabAgencyId)
    {
        return axiosInstance.get(`http://localhost:8080/cabagency/unbooked-cabs/${cabAgencyId}`)   
        
    }

    getBookedCabs(cabAgencyId)
    {
        return axiosInstance.get(`http://localhost:8080/cabagency/booked-cabs/${cabAgencyId}`)   
    }

    getAllCurrentlyBookedCabs(cabAgencyId)
    {
        return axiosInstance.get(`http://localhost:8080/booking/current-bookings/${cabAgencyId}`)   
    }

    updateMobileNumberService(cabAgencyId,newMobileNumber)
    {
        return axiosInstance.patch(`http://localhost:8080/cabagency/mobile/${cabAgencyId}`,newMobileNumber)   
    }

    updatePasswordService(cabAgencyId,newPassword)
    {
        return axiosInstance.patch(`http://localhost:8080/cabagency/password/${cabAgencyId}`,newPassword)   
    }

    logoutService()
    {
        return axiosInstance.post(`http://localhost:8080/cabagency/logout`)
    }

//     deleteProductById(id){
//         return axiosInstance.delete("http://localhost:8090/product/"+id);
//     }

//     addProduct(newProduct){
//         return axiosInstance.post('http://localhost:8090/product',newProduct);
//     }
 }
export default new cabAgencyService();