import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ItemList from "../../Components/Item/ItemList";
export default function GroupPage() {
    const params = useParams()
    const [group, setGroup] = useState({})
    const [isGroupSet, setIsGroupSet] = useState(false)
    const [items, setItems] = useState([])
    const [isItemsSet, setIsItemsSet] = useState(false)

    useEffect(() =>{
        fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}`)
            .then(res => res.json())
            .then(res => {
                setGroup(res.value)
                setIsGroupSet(true)
            });

            fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item`)
            .then(res => res.json())
            .then(res => {
                setItems(res.value)
                setIsItemsSet(true)
            });

    }, [params.user_id, params.group_id])

    return (
        <Container fluid className="pt-5 group-page">
            {isGroupSet ? (
                <Row className="pb-5">
                <Col></Col>
                <Col xl={6} lg={8} sm={10} xs={12}>
                    <Row><h3 className='text-center'>{group.name}</h3></Row>
                    <Row><p className='text-center'>{group.description}</p></Row>
                </Col>
                <Col></Col>
            </Row>
            ) : <h5 className="text-center">Loading group details...</h5>}

            {isItemsSet ? (
                <ItemList items={items} user_id={params.user_id} group_id={params.group_id}/>
            ) : <h5 className="text-center">Loading group items...</h5>}
        </Container>
    );
}