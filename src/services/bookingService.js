import { axiosInstance } from "./axios-http-client";
class bookingService
{
    getAvailableCabsService()
    {
        return axiosInstance.get(`http://localhost:8080/booking/available-cabs`)
    }

    bookCab(customerId,cabId,paymentType)
    {
        return axiosInstance.patch(`http://localhost:8080/booking/book/${customerId}/${cabId}/${paymentType}`)
    }

    getCustomerCurrentBooking(customerId)
    {
        return axiosInstance.get(`http://localhost:8080/customer/currentBooking/${customerId}`)
    }

    bookingOverService(customerId,bookingId)
    {
        return axiosInstance.patch(`http://localhost:8080/booking/completed/${customerId}/${bookingId}`)
    }

    searchByLocation(fromLocation,toLocation)
    {
        return axiosInstance.get(`http://localhost:8080/booking/bylocation/${fromLocation}/${toLocation}`)
    }

    
}

export default new bookingService();