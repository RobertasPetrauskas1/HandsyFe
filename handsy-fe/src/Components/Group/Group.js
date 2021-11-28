import { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Group(props) {
  const group = props.group;
  const [showModal, setShowModal] = useState(false)

  const deleteGroup = () => {
    fetch(`http://localhost:8000/user/${group.user_id}/group/${group.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("TOKEN")
      }
    })
    .then(res => {
      if(res.ok){
        return "Group deleted successfuly"
      }
      else{
        throw new Error("Unexpected error.")
      }
    })
    .then(
      (res) => {
        props.setAlertVariant("success");
        props.setAlertHeading(res);
        props.setShowAlert(true);
        props.setGroups((old) => old.filter((g) => g.id !== group.id))
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
    name: group.name,
    description: group.description
  }
});

const onSubmit = (d) => {
    const request = {
        name: d.name,
        description: d.description
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        },
        body: JSON.stringify(request),
    };

    fetch(`http://localhost:8000/user/${group.user_id}/group/${group.id}`, requestOptions)
        .then(() => {
            fetch(`http://localhost:8000/user/${group.user_id}/group/${group.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                }
            })
                .then(res => res.json())
                .then(res => {
                    props.setGroups((old) => [...old.filter(g => g.id !== group.id), res.value])
                    props.setAlertVariant("success");
                    props.setAlertHeading(
                        "Group updated successfuly"
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
    <Row>
      <Col></Col>
      <Col xl={6} lg={8} sm={10} xs={12} className="group-item mb-3 p-3">
        <Link to={`/user/${group.user_id}/group/${group.id}`} style={{ textDecoration: 'none', color: '#000' }} key={group.id}>
          <Row>
            <Col>FOTO</Col>
            <Col>
              <Row className="text-center"><h6>{group.name}</h6></Row>
              <Row><p>{group.description}</p></Row>
            </Col>
          </Row>
        </Link>
      </Col>
      <Col className="d-flex align-items-center">
      {props.show_actions ? (
        <>
        <Row>
          <Col></Col>
          <Col><Button variant="light"onClick={() => setShowModal(true)}>Edit</Button></Col>
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
                                        Edit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
          <Col><Button variant="dark" onClick={deleteGroup}>Delete</Button></Col>
        </Row>
        </>
      ) : <></>}
      </Col>
    </Row>
  );
}