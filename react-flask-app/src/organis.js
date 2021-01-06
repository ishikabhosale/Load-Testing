import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import Navi from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reports from './pages/Reports'
import EachReport from './pages/EachReport'
import SignIn from './pages/SignIn';
import Admin from './pages/Admin'
import { Row, Col } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

const Organis = () => {
  const [user, setUser] = useState(null)
  const history = useHistory()
  const [loading, setLoading] = useState(true)
    

  useEffect(() => {
    getUserInfo();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, [])

  

  const doLogOut = async () => {
    const resp = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signout`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (resp.ok) {
      const data = await resp.json()
      if (data.success) {
        localStorage.clear('token')
        setUser(null)
      }
    history.push("/")
    }
  }

  const getUserInfo = (async) => {
    const existingToken = localStorage.getItem("token");
    console.log(existingToken)
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/getCurrentUser`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${existingToken}`
        }
      })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("token", existingToken)
        setUser(res.data.user);
        setLoading(false)
     })
     .catch((err) =>{
       console.log(err)
       setLoading(false)
       localStorage.clear("token")
     } );  
 }


  if (loading === true) return <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
  <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
  </div>
  </div> 
  
  if (!user) {
    return (
      <div className="logindiv" >
        <Row style={{ height: '100vh',}}>
          <Col xs={{span: 10 }} md={{span:8 }} lg={{span:6 }} className="login " >
            <SignIn
              user={user}
              setUser={setUser}
            />
          </Col>
        </Row>
      </ div>
    );
  }

  return (
    <>
      <Navi
        user={user}
        doLogOut={doLogOut}
      />
      <Switch>
        <Route exact path='/' render={() => <Home 
        user={user} />} 
        />

        <Route exact path='/admin' render={() => <Admin
        user={user} />} 
        />

        <Route path = "/tests/:id" render={(testsPage={testsPage}) => <Reports 
        user={user}
        {...testsPage} />} />

        <Route path = '/tests/:test_id/:report_id' render={(reportPage = {reportPage}) => <EachReport 
        user={user}
        />} 

        
        />

       
        
      </Switch>    
      <Footer />
      

    </>
  );
}

export default Organis