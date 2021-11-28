import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Item(props) {
  const item = props.item;
  return (
    <Row>
      <Col></Col>
      <Col xl={6} lg={8} sm={10} xs={12} className="item-item mb-3 p-3">
        <Link to={`/user/${props.user_id}/group/${props.group_id}/item/${item.id}`} style={{ textDecoration: 'none', color: '#000' }} key={item.id}>
          <Row>
            <Col>FOTO</Col>
            <Col>
              <Row className="text-center"><h6>{item.name}</h6></Row>
              <Row><p>{item.description}</p></Row>
            </Col>
          </Row>
        </Link>
      </Col>
      <Col></Col>
    </Row>
  );
}