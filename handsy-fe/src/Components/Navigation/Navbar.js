import { Navbar, Nav, Container } from 'react-bootstrap';
import jwt from 'jwt-decode';
import Register from '../Authentication/Register'
import Login from '../Authentication/Login'
import Logout from '../Authentication/Logout'
import { Link } from 'react-router-dom';

export default function Navigation(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Handsy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {props.isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to={`/user/${jwt(localStorage.getItem("TOKEN")).uid}`}>My profile</Nav.Link>
                                <Nav.Link as={Link} to={`/user/${jwt(localStorage.getItem("TOKEN")).uid}/group`}>My groups</Nav.Link>
                            </>
                        ) : <></>}
                    </Nav>
                    <Nav>
                        {props.isLoggedIn ? (
                            <Logout
                                setAlertVariant={props.setAlertVariant}
                                setAlertHeading={props.setAlertHeading}
                                setAlertMsg={props.setAlertMsg}
                                setShowAlert={props.setShowAlert}
                                setIsLoggedIn={props.setIsLoggedIn}
                            />
                        ) : (
                            <>
                                <Register
                                    setAlertVariant={props.setAlertVariant}
                                    setAlertHeading={props.setAlertHeading}
                                    setAlertMsg={props.setAlertMsg}
                                    setShowAlert={props.setShowAlert}
                                />

                                <Login
                                    setAlertVariant={props.setAlertVariant}
                                    setAlertHeading={props.setAlertHeading}
                                    setAlertMsg={props.setAlertMsg}
                                    setShowAlert={props.setShowAlert}
                                    setIsLoggedIn={props.setIsLoggedIn}
                                />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}