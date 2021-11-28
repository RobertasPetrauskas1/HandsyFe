import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import GroupList from "../../Components/Group/GroupList";

export default function HomePage() {
    const [groups, setGroups] = useState([]);
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/group`)
            .then(res => res.json())
            .then(res => {
                setGroups(res.value);
                setIsSet(true);
            })
    }, [])

    return (
        <Container fluid className="pt-5 home-page">
            <Row className="pb-5">
                <Col></Col>
                <Col xl={6} lg={8} sm={10} xs={12}><h3 className='text-center'>Popular groups</h3></Col>
                <Col></Col>
            </Row>
            {isSet ? <GroupList groups={groups} /> : <h5 className="text-center">Loading popular groups... </h5>}
        </Container>
    );
}