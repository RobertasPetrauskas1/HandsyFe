import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import CommentList from "../../Components/Comment/CommentList";

export default function ItemPage() {

    const params = useParams()
    const [item, setItem] = useState({})
    const [isItemSet, setIsItemSet] = useState(false)
    const [comments, setComments] = useState([])
    const [isCommentsSet, setIsCommentsSet] = useState(false)

    useEffect(() =>{
        fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item/${params.item_id}`)
            .then(res => res.json())
            .then(res => {
                setItem(res.value)
                setIsItemSet(true)
            });

            fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item/${params.item_id}/comment`)
            .then(res => res.json())
            .then(res => {
                setComments(res.value)
                setIsCommentsSet(true)
            });

    }, [params.user_id, params.group_id, params.item_id])

    return (
        <Container fluid className="pt-5 item-page">
            {isItemSet ? (
                <Row className="pb-5">
                <Col></Col>
                <Col xl={6} lg={8} sm={10} xs={12}>
                    <Row><h3 className='text-center'>{item.name}</h3></Row>
                    <Row><p className='text-center'>{item.description}</p></Row>
                </Col>
                <Col></Col>
            </Row>
            ) : <h5 className="text-center">Loading item details...</h5>}

            {isCommentsSet ? (
                <CommentList comments={comments} user_id={params.user_id} group_id={params.group_id} item_id={params.item_id}/>
            ) : <><br /><h5 className="text-center">Loading comments...</h5></>}
        </Container>
    );
}