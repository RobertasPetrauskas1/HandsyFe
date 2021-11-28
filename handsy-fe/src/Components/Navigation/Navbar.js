import { Navbar, Nav } from 'react-bootstrap';
import jwt from 'jwt-decode';
import Register from '../Authentication/Register'
import Login from '../Authentication/Login'
import Logout from '../Authentication/Logout'

export default function Navigation(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/" style={{marginLeft: "1em"}}>Handsy</Navbar.Brand>
            <Navbar.Collapse className="container-fluid">
                <Nav>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav >
                    {props.isLoggedIn ? (
                        <>
                            {/* Check if current user is ADMIN */}
                            {jwt(localStorage.getItem("TOKEN")).role === "ADMIN" ? (
                                <Nav.Link href="/admin">For Admins</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link href={`/user/${jwt(localStorage.getItem("TOKEN")).uid}`}>My profile</Nav.Link>
                                    <Nav.Link href={`/user/${jwt(localStorage.getItem("TOKEN")).uid}/group`}>My groups</Nav.Link>
                                </>
                            )}
                            <Logout
                                setAlertVariant={props.setAlertVariant}
                                setAlertHeading={props.setAlertHeading}
                                setAlertMsg={props.setAlertMsg}
                                setShowAlert={props.setShowAlert}
                                setIsLoggedIn={props.setIsLoggedIn}
                            />
                        </>
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
        </Navbar>
    )
}