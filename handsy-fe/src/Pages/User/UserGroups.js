import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import GroupList from "../../Components/Group/GroupList";

export default function UserGroups(props) {
    const params = useParams()
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState({});
    const [isSet, setIsSet] = useState(false);
    const [groups, setGroups] = useState([])
    const [isSetGroups, setIsSetGroups] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/user/${params.user_id}`)
            .then(res => res.json())
            .then(res => {
                setUser(res.value);
                setGroups(res.value.groups);
                setIsSet(true);
                setIsSetGroups(true);
            })
    }, [params.user_id])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (d) => {
        const request = {
            name: d.name,
            description: d.description
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(request),
        };

        fetch(`http://localhost:8000/user/${params.user_id}/group/`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                fetch(`http://localhost:8000/user/${params.user_id}/group/${res.value.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        setGroups((old) => [...old, res.value])
                        props.setAlertVariant("success");
                        props.setAlertHeading(
                            "Group created successfuly"
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
        <Container fluid className="pt-5 user-page">
            {isSet ? (
                <>
                    <Row className="pb-5">
                        <Col></Col>
                        <Col xl={6} lg={8} sm={10} xs={12}><h5 className='text-center'>Groups created by {user.first_name + " " + user.last_name}:</h5></Col>
                        <Col>
                            <Button variant="secondary" onClick={() => setShowModal(true)}>Add new group</Button>
                            <Modal
                                show={showModal}
                                onHide={() => setShowModal(false)}
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">
                                        Register
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit(onSubmit)} id="RegisterForm">
                                        <Form.Group>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register("name", {
                                                    required: "Enter your group name",
                                                })}
                                                placeholder="Name"
                                            />
                                            {errors.name && (
                                                <>
                                                    <span className="text-danger">{errors.name.message}</span>
                                                </>
                                            )}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                {...register("description", {
                                                    required: "Enter something about the group",
                                                })}
                                                placeholder="..."
                                            />
                                            {errors.description && (
                                                <>
                                                    <span className="text-danger">{errors.description.message}</span>
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
                    <GroupList
                        setGroups={setGroups}
                        groups={groups}
                        show_actions={true}
                        setAlertVariant={props.setAlertVariant}
                        setAlertHeading={props.setAlertHeading}
                        setAlertMsg={props.setAlertMsg}
                        setShowAlert={props.setShowAlert}
                    />
                </>
            ) : <h5 className="text-center">Loading group data...</h5>}
        </Container>
    );
}