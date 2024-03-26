import { useNavigate } from "react-router-dom"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default function Home()
{
    const navigate=useNavigate();

    function handleCabAgencySignup()
    {
        navigate(`/signup/${"cabagency"}`)
    }

    function handleCustomerSignup()
    {
        navigate(`/signup/${"customer"}`)
    }

    function handleCabAgencyLogin()
    {
        navigate(`/login/${"cabagency"}`)
    }

    function handleCustomerLogin()
    {
        navigate(`login/${"customer"}`)
    }

    return(
       
    
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Cab Booking Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Signup" id="signup-dropdown">
                            <NavDropdown.Item onClick={handleCabAgencySignup}>Cab Agency</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleCustomerSignup}> Customer</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Login" id="login-dropdown">
                            <NavDropdown.Item onClick={handleCabAgencyLogin}> Cab Agency</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleCustomerLogin}>Customer</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
       
    )
}