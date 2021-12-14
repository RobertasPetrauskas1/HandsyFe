import { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import ItemList from "../../Components/Item/ItemList";
import jwt from "jwt-decode"
import { useForm } from "react-hook-form";

export default function GroupPage(props) {
    const params = useParams()
    const [group, setGroup] = useState({})
    const [isGroupSet, setIsGroupSet] = useState(false)
    const [items, setItems] = useState([])
    const [isItemsSet, setIsItemsSet] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 500ms ease-out",
        animationFillMode: "forwards"
    };

    useEffect(() => {
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

    useEffect(() =>{
        let token = localStorage.getItem("TOKEN")
        if(token){
            let currentUserId = jwt(token).uid
            if (currentUserId === group.user_id) {
                setIsOwner(true)
            }
        }
    }, [group])

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

        fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                fetch(`http://localhost:8000/user/${params.user_id}/group/${params.group_id}/item/${res.value.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        setItems((old) => [...old, res.value])
                        props.setAlertVariant("success");
                        props.setAlertHeading(
                            "Item created successfuly"
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
        <Container fluid className="pt-5 group-page">
            {isGroupSet ? (
                <div style={isGroupSet ? mountedStyle : unmountedStyle}>
                <Row className="pb-5">
                    <Col></Col>
                    <Col xl={6} lg={8} sm={10} xs={12}>
                        <Row><h3 className='text-center'>{group.name}</h3></Row>
                        <Row><p className='text-center'>{group.description}</p></Row>
                    </Col>
                    <Col>
                        {isOwner ? (
                            <>
                                <Button variant="secondary" onClick={() => setShowModal(true)}>Add new item</Button>
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="example-custom-modal-styling-title"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            New Item
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit(onSubmit)} id="RegisterForm">
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    {...register("name", {
                                                        required: "Enter your item name",
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
                                                        required: "Enter something about the item",
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
                            </>
                        ) : <></>}
                    </Col>
                </Row>
                </div>
            ) : <h5 style={isGroupSet ? mountedStyle : unmountedStyle} className="text-center">Loading group details...</h5>}


            {isItemsSet ? (
                <div style={isItemsSet ? mountedStyle : unmountedStyle}>
                <ItemList
                    items={items}
                    setItems={setItems}
                    user_id={params.user_id}
                    group_id={params.group_id}
                    show_actions={isOwner}
                    setAlertVariant={props.setAlertVariant}
                    setAlertHeading={props.setAlertHeading}
                    setAlertMsg={props.setAlertMsg}
                    setShowAlert={props.setShowAlert}
                />
                </div>
            ) : <h5 style={isItemsSet ? mountedStyle : unmountedStyle} className="text-center">Loading group items...</h5>}
        </Container>
    );
}