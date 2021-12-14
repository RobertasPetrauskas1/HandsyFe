import { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import CommentList from "../../Components/Comment/CommentList";

export default function ItemPage(props) {

    const params = useParams()
    const [item, setItem] = useState({})
    const [isItemSet, setIsItemSet] = useState(false)
    const [comments, setComments] = useState([])
    const [isCommentsSet, setIsCommentsSet] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 500ms ease-out",
        animationFillMode: "forwards"
    };

    useEffect(() => {
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
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (d) => {
        const request = {
            message: d.message
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(request),
        };

        fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item/${params.item_id}/comment`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item/${params.item_id}/comment/${res.value.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        setComments((old) => [...old, res.value])
                        props.setAlertVariant("success");
                        props.setAlertHeading(
                            "Comment created successfuly"
                        );
                        props.setShowAlert(true);
                    })
            },
                (error) => {
                    props.setAlertVariant("danger");
                    props.setAlertHeading("Error:");
                    props.setAlertMsg(error);
                    props.setShowAlert(true);
                }
            );
        setShowModal(false);
        props.setShowAlert(true);
    };

    return (
        <Container fluid className="pt-5 item-page">
            {isItemSet ? (
                <div style={isItemSet ? mountedStyle : unmountedStyle}>
                <Row className="pb-5">
                    <Col></Col>
                    <Col xl={6} lg={8} sm={10} xs={12}>
                        <Row><h3 className='text-center'>{item.name}</h3></Row>
                        <Row><p className='text-center'>{item.description}</p></Row>
                    </Col>
                    <Col></Col>
                </Row>
                </div>
            ) : <h5 style={isItemSet ? mountedStyle : unmountedStyle} className="text-center">Loading item details...</h5>}

            {isCommentsSet ? (
                <div style={isCommentsSet ? mountedStyle : unmountedStyle}>
                    <Row>
                        <Col></Col>
                        <Col><h3 className="text-center">Comments:</h3></Col>
                        <Col>
                        {props.isLoggedIn ? (
                            <Button variant="secondary" onClick={() => setShowModal(true)}>Leave a comment</Button>
                        ) : <></>}
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="example-custom-modal-styling-title"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            New Comment
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit(onSubmit)} id="RegisterForm">
                                            <Form.Group>
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    {...register("message", {
                                                        required: "Please enter your message",
                                                        max: 300
                                                    })}
                                                    placeholder="..."
                                                />
                                                {errors.message && (
                                                    <>
                                                        <span className="text-danger">{errors.message.message}</span>
                                                    </>
                                                )}
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" form="RegisterForm" variant="secondary">
                                            Create
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                        </Col>
                    </Row>
                    <CommentList
                        comments={comments}
                        setComments={setComments}
                        user_id={params.user_id}
                        group_id={params.group_id}
                        item_id={params.item_id}
                        setAlertVariant={props.setAlertVariant}
                        setAlertHeading={props.setAlertHeading}
                        setAlertMsg={props.setAlertMsg}
                        setShowAlert={props.setShowAlert}
                    />
                </div>
            ) : <><br /><h5 style={isCommentsSet ? mountedStyle : unmountedStyle} className="text-center">Loading comments...</h5></>}
        </Container>
    );
}