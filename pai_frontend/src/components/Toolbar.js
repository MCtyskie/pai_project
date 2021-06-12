import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import AuthContext from './AuthContext';


class Toolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		console.log("Loaded toolbar");
		console.log(this.context.isAuthorized());
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
							<NavDropdown.Item key="9" href="/manage_events" title="manage_events">Organised Events</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="My Profile" id="profile">
							<NavDropdown.Item key="3" href="/profile" title="view_profile">View Profile</NavDropdown.Item>
							<NavDropdown.Item key="8" href="/participated_events" title="participated_events">Participated Events</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Invitations" id="invitations">
							<NavDropdown.Item key="4" href="/my_invitations" title="view_invitations">View Invitations</NavDropdown.Item>
							<NavDropdown.Item key="5" href="/event_invitations" title="manage_invitations">Manage Events Invitations</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Reviews" id="reviews">
							<NavDropdown.Item key="6" href="/my_reviews" title="">My Reviews</NavDropdown.Item>
							<NavDropdown.Item key="7" href="/issue_review" title="">Write Review</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						{this.context.isAuthorized() ? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

		);
	}
}

Toolbar.contextType = AuthContext

export { Toolbar };