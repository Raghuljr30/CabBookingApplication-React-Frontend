import { axiosInstance } from "./axios-http-client";
class customerService {

    registerCustomer(newCustomer)
    {
        return axiosInstance.post('http://localhost:8080/customer',newCustomer);
    }

    loginCustomer(customer)
    {
        return axiosInstance.post(`http://localhost:8080/customer/login/${customer.customerId}/${customer.customerEmail}/${customer.customerPassword}`);
    }

    

    

    

 }
export default new customerService();