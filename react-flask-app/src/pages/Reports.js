import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col, Modal, Card, Container , Button, Table} from 'react-bootstrap';



const Reports = (props) => {
    const params = useParams()
    const history = useHistory()
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        testsPage(params['id'])
    }, [])

    const testsPage = async (id) => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/tests/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        if (resp.ok) {
            const data = await resp.json()
            if (data.success) {
                setReports(data.reports)
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
                <h1>Jobs</h1>
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
  {reports.map((report, index) =>(
       <tr key={index}>
       <td>{index +1 }</td>
       <td onClick={() => history.push('/tests/' + params['id'] + '/' + report.report_id )}>{report.report_id}</td>
       <td>{report.last_updated_at}</td>
       <td>Run</td>
       <td onClick={() => history.push('/tests/' + params['id'] + '/' + test.report_id)}>{report.last_success_rate}</td>
     </tr>
  ))}
  </tbody>
</Table>
            </Container>

        </>
    );
}

export default Reports