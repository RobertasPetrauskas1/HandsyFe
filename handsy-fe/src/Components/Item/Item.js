import { useState } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Item(props) {
  const item = props.item;
  const [showModal, setShowModal] = useState(false)
  const mountedStyle = { animation: "inAnimation 500ms ease-in" };

  const deleteItem = () => {
    fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("TOKEN")
      }
    })
      .then(res => {
        if (res.ok) {
          return "Item deleted successfuly"
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
          props.setItems((old) => old.filter((g) => g.id !== item.id))
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
      name: item.name,
      description: item.description
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

    fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${item.id}`, requestOptions)
      .then(() => {
        fetch(`http://localhost:8000/user/${props.user_id}/group/${props.group_id}/item/${item.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
          }
        })
          .then(res => res.json())
          .then(res => {
            props.setItems((old) => [...old.filter(g => g.id !== item.id), res.value])
            props.setAlertVariant("success");
            props.setAlertHeading(
              "Item updated successfuly"
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
    <Row style={mountedStyle}>
      <Col></Col>
      <Col xl={6} lg={8} sm={10} xs={12} className="item-item mb-3 p-3">
        <Link to={`/user/${props.user_id}/group/${props.group_id}/item/${item.id}`} style={{ textDecoration: 'none', color: '#000' }} key={item.id}>
          <Row>
            <Col>
              <img
                src='/default_image.jpg'
                className='img-fluid img-thumbnail'
                alt='foto'
                style={{ maxWidth: '12rem' }}
              />
            </Col>
            <Col>
              <Row className="text-center"><h6>{item.name}</h6></Row>
              <Row><p>{item.description}</p></Row>
            </Col>
          </Row>
        </Link>
      </Col>
      <Col className="d-flex align-items-center">
        {props.show_actions ? (
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
                    Edit item
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
                    Edit
                  </Button>
                </Modal.Footer>
              </Modal>
              <Col><Button variant="dark" onClick={deleteItem}>Delete</Button></Col>
            </Row>
          </>
        ) : <></>}
      </Col>
    </Row>
  );
}