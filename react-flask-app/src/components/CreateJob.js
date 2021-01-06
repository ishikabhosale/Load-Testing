import React, {useState} from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap';


const CreateJob = (props) => {
    // [props.user, props.setUser] = useState({})
    const [input,setInput] = useState({})
    const handleOnChange = (e) => {
        setInput({ ...input,
            [e.target.name]:e.target.value
        })
    }

    const newUser = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
        },
          body: JSON.stringify(input)
        })
        
        const data = await resp.json()
        if (data.success) {
            window.location.replace('/admin')
        }
      }


    return (
<Form className="signin-form" onChange={(e) => handleOnChange(e)}  onSubmit={(e) => newUser(e)}>
    <h1>Register</h1>
   
    <Form.Group controlId="formFirstName">
        <Form.Control name="name" type="name" placeholder="Name" />
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
        <Form.Control name="email" type="email" placeholder="Enter email" />
    </Form.Group>
    <Button block size="lg" variant="success"type="submit">
        Register
    </Button>
</Form>
    )
}
export default CreateJob