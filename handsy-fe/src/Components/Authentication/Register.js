import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (d) => {
    const request = {
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      password: d.password,
      birth_date: d.birth_date,
      description: d.description
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    };

    fetch("http://localhost:8000/auth/register", requestOptions)
      .then((res) => res.text())
      .then(
        (result) => {
          if (result === "Success") {
            props.setAlertVariant("success");
            props.setAlertHeading(
              "Account created successfuly. Please login."
            );
            props.setShowAlert(true);
          }
        },
        (error) => {
          props.setAlertVariant("danger");
          props.setAlertHeading("Error:");
          props.setAlertMsg(error);
          props.setShowAlert(true);
        }
      );
    setShow(false);
    props.setShowAlert(true);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShow(true)} style={{marginLeft: "1em", marginRight: "1em"}}>
        Register
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
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
                {...register("first_name", {
                  required: "Enter your first name",
                })}
                placeholder="Name"
              />
              {errors.first_name && (
                <>
                  <span className="text-danger">{errors.first_name.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                {...register("last_name", {
                  required: "Enter your last name",
                })}
                placeholder="Surname"
              />
              {errors.last_name && (
                <>
                  <span className="text-danger">{errors.last_name.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Enter your email",
                })}
                placeholder="example@mail.com"
              />
              {errors.email && (
                <>
                  <span className="text-danger">{errors.email.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Enter your password",
                })}
                placeholder="password"
              />
              {errors.password && (
                <>
                  <span className="text-danger">{errors.password.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Birth date</Form.Label>
              <Form.Control
                type="text"
                {...register("birth_date", {
                  required: "Enter your birth date in a format of yyyy-mm-dd",
                  pattern: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/
                })}
                placeholder="1999-01-01"
              />
              {errors.birth_date && (
                <>
                  <span className="text-danger">{errors.birth_date.message}</span>
                </>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", {
                  required: "Enter something about yourself",
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
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}