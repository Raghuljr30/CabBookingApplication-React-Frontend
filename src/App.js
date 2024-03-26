import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import CabAgency from './components/CabAgency';
import Home from './components/Home';
import Customer from './components/Customer';
import Booking from './components/Booking';
import Payment from './components/Payment';
import ViewProfile from './components/ViewProfile';
import EditProfile from './components/EditProfile';
import SignupSuccessful from './screens/SignupSuccessful';

function App() {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup/:role'  element={<Signup/>}/>
      <Route path='/login/:role'  element={<Login/>}/>
      <Route path='/cabagency/:id'  element={<CabAgency/>}/>
      <Route path='/customer/:id' element={<Customer/>}/>

      <Route path='/booking/:id' element={<Booking/>}/>

      <Route path='/payment/:id' element={<Payment/>}/>

      <Route path='/view-profile/:id' element={<ViewProfile/>}/>
      <Route path='/edit-profile/:id' element={<EditProfile/>}/>

      <Route path='/signup-success/:id' element={<SignupSuccessful/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
