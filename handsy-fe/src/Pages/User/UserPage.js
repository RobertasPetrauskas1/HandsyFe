import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupList from "../../Components/Group/GroupList";

export default function UserPage() {
    const params = useParams()
    const [user, setUser] = useState({});
    const [isSet, setIsSet] = useState(false);

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
                <>
                    <Row className="pb-5">
                        <Col></Col>
                        <Col xl={6} lg={8} sm={10} xs={12}><h3 className='text-center'>Everything about {user.first_name + " " + user.last_name}</h3></Col>
                        <Col></Col>
                    </Row>
                    <Row className="pb-5">
                        <Col></Col>
                            <Col xl={6} lg={8} sm={10} xs={12}>
                                <h5 className='text-center'>Birth date: {user.birth_date}</h5>
                            </Col>
                        <Col></Col>
                    </Row>
                    <Row className="pb-5">
                        <Col></Col>
                            <Col xl={6} lg={8} sm={10} xs={12}>
                                <h5 className='text-center'>Description: {user.description}</h5>
                            </Col>
                        <Col></Col>
                    </Row>
                    <Row></Row>
                    <Row className="pb-5">
                        <Col></Col>
                        <Col xl={6} lg={8} sm={10} xs={12}><h5 className='text-center'>Groups created by {user.first_name + " " + user.last_name}:</h5></Col>
                        <Col></Col>
                    </Row>
                    <GroupList groups={user.groups} show_actions={false}/>
                </>
            ) : <h5 className="text-center">Loading user data...</h5>}
        </Container>
    );
}