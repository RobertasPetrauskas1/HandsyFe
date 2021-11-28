import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Comment(props) {
    const comment = props.comment;
    let timestamp = comment.timestamp.substring(0, 10) + " " + comment.timestamp.substring(11, 19)
    return (
        <Row>
            <Col></Col>
            <Col xl={6} lg={8} sm={10} xs={12} className="comment-item mb-3 p-3">
                <Link to={`/user/${comment.user_id}`} style={{ textDecoration: 'none', color: '#000' }} key={comment.id}>
                    <Row>
                        <Col><h6>{comment.username}</h6></Col>
                        <Col></Col>
                        <Col><h6>{timestamp}</h6></Col>
                    </Row>
                </Link>
                <Link to={`/user/${props.user_id}/group/${props.group_id}/item/${props.item_id}/comment/${comment.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <Row><p>{comment.message}</p></Row>
                </Link>
            </Col>
            <Col></Col>
        </Row>
    );
}
