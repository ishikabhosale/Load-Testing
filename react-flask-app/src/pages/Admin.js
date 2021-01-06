import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col, Modal, Card, Container , Button, Table, Tab, Tabs} from 'react-bootstrap';
import AddUser from "../components/AddUser"



const Admin = (props) => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [tests, setTests] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        adminPage()
    }, [])

    const adminPage = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (resp.ok) {
            const data = await resp.json()
            if (data.success) {
                setUsers(data.all_users)
                setTests(data.all_tests)
                setLoading(false)
            }
        }
    }
    
   

    
    if (loading === true) return <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
    <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
    </div>
</div>
    return (
        <>
            <Container>
            <Tabs defaultActiveKey="users" id="uncontrolled-tab-example">
                <Tab eventKey="users" title="Users">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) =>(
                    <tr key={index}>
                    <td>{index +1 }</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
                </Tab>
                <Tab eventKey="tests" title="All Tests" label = "Blas lbals">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Predator Id</th>
                    <th>Date Created</th>
                    <th>Run the test</th>
                    <th>Latest Report</th>
                    </tr>
                </thead>
                <tbody>
                {tests.map((test, index) =>(
                    <tr key={index}>
                    <td>{index +1 }</td>
                    <td onClick={() => history.push('/tests/' + test.id )}>{test.id}</td>
                    <td>{test.updated_at}</td>
                    <td>Run</td>
                    <td onClick={() => history.push('/tests/' + test.predator_id + '/' + test.report_id)}>{test.last_success_rate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
                </Tab>
                <Tab eventKey="createUsers" title="Create Users">
                    <AddUser/>
                </Tab>
            </Tabs>
            
            </Container>

        </>
    );
}

export default Admin