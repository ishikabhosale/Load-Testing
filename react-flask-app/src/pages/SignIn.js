import React , {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SignIn = (props) => {
    const [user, setUser] = useState({})

    const [input,setInput] = useState({})
    const handleOnChange = (e) => {
        setInput({ ...input,
            [e.target.name]:e.target.value
        })
    }

    const login = async(e)=>{
        e.preventDefault()
        console.log(input.email)
        var postData = {
            email: input.email,
            password : input.password
        };
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/signin`,postData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((res) => {
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            window.location.replace('/')
          })
          .catch((error) => {
        console.error(error)
      })
    {/* 
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/signin` ,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(input)
        });
        const data = await res.json()
        if (data.success){
            localStorage.setItem('token', data.token)
            setUser(data.user)
            window.location.replace('/')
        }
        */}
    }

    return (
<Form className="signin-form" onChange={e=>handleOnChange(e)} onSubmit={(e)=>login(e)}>
    
    <h1>Login</h1>
     <br/>
    <Form.Group controlId="formBasicEmail">
        <Form.Control type="email" name="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
        <Form.Control type="password" name="password" placeholder="Password" />
    </Form.Group>
    <Button block size="lg" variant="success" type="submit">
        Login
    </Button>
    {/* <Button block size="lg" variant="primary" href='/register' >Register</Button> */}
    
</Form>
    )
}
export default SignIn