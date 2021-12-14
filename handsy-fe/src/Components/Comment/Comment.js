import { useEffect, useState } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt from "jwt-decode"
import { useForm } from "react-hook-form";

export default function Comment(props) {
    const comment = props.comment;
    const [isOwner, setIsOwner] = useState(false)
    let timestamp = comment.timestamp.substring(0, 10) + " " + comment.timestamp.substring(11, 19)
    const [showModal, setShowModal] = useState(false)
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };

    const deleteComment = () => {
        fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${props.item_id}/comment/${comment.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("TOKEN")
            }
        })
            .then(res => {
                if (res.ok) {
                    return "Comment deleted successfuly"
                }
                else {
                    throw new Error("Unexpected error.")
                }
            })
            .then(
                (res) => {
                    props.setAlertVariant("success");
                    props.setAlertHeading(res);
                    props.setShowAlert(true);
                    props.setComments((old) => old.filter((g) => g.id !== comment.id))
                },
                (err) => {
                    props.setAlertVariant("danger");
                    props.setAlertHeading("Error:");
                    props.setAlertMsg(err);
                    props.setShowAlert(true);
                }
            );
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            message: comment.message,
        }
    });

    const onSubmit = (d) => {
        const request = {
            message: d.message
        }
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(request),
        };

        fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${props.item_id}/comment/${comment.id}`, requestOptions)
            .then(() => {
                fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${props.item_id}/comment/${comment.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        props.setComments((old) => [...old.filter(g => g.id !== comment.id), res.value])
                        props.setAlertVariant("success");
                        props.setAlertHeading(
                            "Comment updated successfuly"
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


    useEffect(() => {
        let token = localStorage.getItem("TOKEN")
        if (token && comment.user_id === jwt(localStorage.getItem("TOKEN")).uid) {
            setIsOwner(true)
        }
    }, [comment.user_id])

    return (
        <Row style={mountedStyle}>
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
            <Col className="d-flex align-items-center">
                {isOwner ? (
                    <>
                        <Row>
                            <Col></Col>
                            <Col><Button variant="light" onClick={() => setShowModal(true)}>Edit</Button></Col>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">
                                        Edit comment
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
                                                    required: "Enter your message",
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
                                        Edit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Col><Button variant="dark" onClick={deleteComment}>Delete</Button></Col>
                        </Row>
                    </>
                ) : <></>}
            </Col>
        </Row>
    );
}
