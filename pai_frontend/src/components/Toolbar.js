import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'


class Toolbar extends React.Component {
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
				<Navbar.Brand href="/">Covid AfterParty!</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<NavDropdown title="Events" id="events">
							<NavDropdown.Item key="1" href="/events" title="list_events">Show Events</NavDropdown.Item>
							<NavDropdown.Item key="2" href="/add_event" title="add_event">Add Event</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="My Profile" id="profile">
							<NavDropdown.Item key="3" href="/profile" title="view_profile">View Profile</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						{localStorage.getItem('token') ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link href="/logout">Logout</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

		);
	}
}

export { Toolbar };