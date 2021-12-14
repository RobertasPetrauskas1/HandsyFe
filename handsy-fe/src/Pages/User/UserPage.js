import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupList from "../../Components/Group/GroupList";
import {BsFillCalendar2DateFill} from "react-icons/bs"
import {MdDescription} from "react-icons/md"
import {FaUser} from "react-icons/fa"

export default function UserPage() {
    const params = useParams()
    const [user, setUser] = useState({});
    const [isSet, setIsSet] = useState(false);
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 500ms ease-out",
        animationFillMode: "forwards"
    };

    useEffect(() => {
        fetch(`http://localhost:8000/user/${params.user_id}`)
            .then(res => res.json())
            .then(res => {
                setUser(res.value);
                setIsSet(true);
            })
    }, [params.user_id])
    return (
        <Container fluid className="pt-5 user-page">
            {isSet ? (
                <div style={isSet ? mountedStyle : unmountedStyle}>
                    <Row className="pb-5">
                        <Col></Col>
                        <Col xl={4} lg={4} sm={12} xs={12} style={{ maxWidth: '24rem' }}>
                            <img
                                src='/default_image.jpg'
                                className='img-fluid img-thumbnail'
                                alt='foto'                  
                            />
                        </Col>
                        <Col xs={1}></Col>
                        <Col>
                            <Row className="pb-5">
                                <Col><FaUser size={35}/></Col>
                                <Col xl={6} lg={8} sm={10} xs={12}><h3 className='text-center'>Everything about {user.first_name + " " + user.last_name}</h3></Col>
                                <Col></Col>
                            </Row>
                            <Row className="pb-5">
                                <Col><BsFillCalendar2DateFill size={35}/></Col>
                                <Col xl={6} lg={8} sm={10} xs={12}>
                                    <h5 className='text-center'>Birth date: {user.birth_date}</h5>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row className="pb-5">
                                <Col><MdDescription size={35}/></Col>
                                <Col xl={6} lg={8} sm={10} xs={12}>
                                    <h5 className='text-center'>Description: {user.description}</h5>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row></Row>
                    <Row className="pb-5">
                        <Col></Col>
                        <Col xl={6} lg={8} sm={10} xs={12}><h5 className='text-center'>Groups created by {user.first_name + " " + user.last_name}:</h5></Col>
                        <Col></Col>
                    </Row>
                    <GroupList groups={user.groups} show_actions={false} />
                </div>
            ) : <h5 style={isSet ? mountedStyle : unmountedStyle} className="text-center">Loading user data...</h5>}
        </Container>
    );
}