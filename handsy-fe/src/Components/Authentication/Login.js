import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Login(props){
    const [show, setShow] = useState(false);
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:8000/auth/login', requestOptions)
        .then(res => {
            if(res.ok){
                return res.json()
            }else if(res.status === 401){
                throw Error("Bad email and/or password")
            }else{
                throw Error(res.text())
            }
        })
        .then(res =>{
            localStorage.setItem('TOKEN', res.value.token)
                props.setAlertVariant('success')
                props.setAlertHeading("Welcome!")
                props.setIsLoggedIn(true)
        }, err => {
            props.setAlertVariant('danger')
            props.setAlertHeading("Error:")
            props.setAlertMsg(err)
        })
        setShow(false);
        props.setShowAlert(true)
    }

    return <>
    <Button className="ml-2" variant="secondary" onClick={() => setShow(true)} style={{marginLeft: "1em", marginRight: "1em"}}>Login</Button>
    <Modal
    show={show}
    onHide={() => setShow(false)}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-custom-modal-styling-title">
        Login
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(onSubmit)} id="LoginForm">
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register('email')} placeholder="Email" />
        </Form.Group>
        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...register('password')} placeholder="Password" />
        </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button type="submit" form="LoginForm" variant="secondary">Login</Button>
    </Modal.Footer>
  </Modal>
    </>;
}