import React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap';


class Toolbar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	    console.log("Loaded toolbar");
	}

	render() {
		return (
			<Navbar bg="light" expand="lg">
			  <Navbar.Brand href="#home">Covid AfterParty!</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				  <Nav.Link href="#home">Home</Nav.Link>
				  <NavDropdown title="Events" id="events">
					<NavDropdown.Item key="1" href="/events" title="list_events">Show Events</NavDropdown.Item>
					<NavDropdown.Item key="2" href="/event" title="add_event">Add Event</NavDropdown.Item>
				  </NavDropdown>
				</Nav>
			  </Navbar.Collapse>
			</Navbar>
			
		);
	}
}

export {Toolbar};