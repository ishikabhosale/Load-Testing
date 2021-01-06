import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col, Modal, Card, Container , Button, Table} from 'react-bootstrap';



const EachReport = (props) => {
    const params = useParams()
    const history = useHistory()
    const [report, setReport] = useState([])
    const [loading, setLoading] = useState(true)

   

    useEffect(() => {
        reportPage(params['test_id'], params['report_id'])
    }, [])

    const reportPage = async (test_id, report_id ) => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/tests/${test_id}/${report_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (resp.ok) {
            const data = await resp.json()
            if (data.success) {
                setReport(data.report)
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
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Report Id</th>
      <th>Last Updated</th>
      <th>Re-Run the Test</th>
      <th>Report success rate</th>
    </tr>
  </thead>
  <tbody>
  {report.map((repor, index) =>(
       <tr key={index}>
       <td>{index +1 }</td>
       <td onClick={() => history.push('/tests/' + params['id'] + '/' + test.report_id )}>{test.report_id}</td>
       <td>{test.date_posted}</td>
       <td>Run</td>
       <td onClick={() => history.push('/tests/' + test.predator_id + '/' + test.report_id)}>{test.last_success_rate}</td>
     </tr>
  ))}
  </tbody>
</Table>
            </Container>

        </>
    );
}

export default EachReport