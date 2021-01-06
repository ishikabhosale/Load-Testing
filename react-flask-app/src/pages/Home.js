import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Row, Col, Modal, Card, Container , Button, Table} from 'react-bootstrap';
import CreateJob from '../components/CreateJob'



const Home = (props) => {
    const history = useHistory()
    const [tests, setTests] = useState([])
    const [show3, setShow3] = useState(false);
    const [input, setInput] = useState([])
    const [loading, setLoading] = useState(true)

   

    useEffect(() => {
        getTests();
    }, [])

   
    const getTests = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/account`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (resp.ok) {
            const data = await resp.json()
            setTests(data.tests)
            setLoading(false)
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
                <h1>Tests</h1>
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
       <td onClick={() => history.push('/tests/' + test.predator_id )}>{test.predator_id}</td>
       <td>{test.date_posted}</td>
       <Popup modal trigger={<Button>Register for Demo</Button>}>
        {close => <Content close={close} />}
      </Popup>
       <td onClick={() => history.push('/tests/' + test.predator_id + '/' + test.report_id)}>{test.last_success_rate}</td>
     </tr>
  ))}
  </tbody>
</Table>
            </Container>

        </>
    );
}

export default Home