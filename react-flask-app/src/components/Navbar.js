import React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaHome, FaPlusCircle, FaUserCircle } from 'react-icons/fa';



const Navi = (props) => {
    // const k = window.location.pathname
    // const pId = window.location.pathname.split("/project/")[1]
    // console.log('===========', pId)
    // WORK FROM HERE I HAVE THE ID OF A PROJECT FOR CREATING TASKS IN NAVBAR BUT NEED TO GUARD AGAINST null OR inocrrect ID

    return (
        <>
            <Navbar md={12} className='navbar align-middle' expand="lg"  >
                <Navbar.Brand href="/">
                Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link className=" ml-5" href="/">Hi, {props.user.name}</Nav.Link>
                    <Nav.Link className=" ml-5" href="/"><FaHome /></Nav.Link>
                    <NavDropdown className=" ml-5 mr-5" title={
                        <span><FaUserCircle /> </span>
                    } id="basic-nav-dropdown" >
                        <NavDropdown.Item href="/mytasks">My Tasks</NavDropdown.Item>
                        <NavDropdown.Item href="/allprojects">All Projects</NavDropdown.Item>
                        {
                            props.user.email == "admin@gmail.com" && <NavDropdown.Item href= "/admin">Admin DashBoard</NavDropdown.Item>
                        }
                        {/* <NavDropdown.Item href="#action/3.3">This Week</NavDropdown.Item> */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => props.doLogOut(props.user.user_id)} >Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >

        </>
    );
}

export default Navi