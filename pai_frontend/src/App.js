import React, { Component } from 'react';
import { Toolbar } from './components/Toolbar';
import { ProfileView } from './components/Profile/ProfileView';
import { WelcomeMenu } from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Logout } from './components/Logout';
import { AddEvent } from './components/Event/AddEvent';
import { EventDetails } from './components/Event/EventDetails';
import { EventView } from './components/Event/EventView';
import AuthContext from './components/AuthContext';
import { UsersView } from './components/AdminPanel/UsersView';
import { InvitationView } from './components/Invitation/InvitationView';
import { ReviewView } from './components/Review/ReviewView';
import { EventInvitations } from './components/Invitation/EventInvitations';
import { AddReview } from './components/Review/AddReview';
import { ProfileEvents } from './components/Profile/ProfileEvents';
import { ManageEvents } from './components/Event/ManageEvents';

function getToken() {
	return localStorage.getItem('token');
}

function isLogged() {
	let token = getToken();
	if (token !== undefined && token !== null) {
		return true;
	}
	return false;
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		console.log("Loaded App js");
		// TEMP key for development
		localStorage.setItem('token', "TESTOKEN123.123.123");
	}


	render() {
		return (
			<div>
				<BrowserRouter>
					<AuthContext.Provider value={{ getToken: getToken, isAuthorized: isLogged }}>
						<Toolbar />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route exact path="/" component={WelcomeMenu} />
						<Route path="/logout" component={Logout} />
						<Route path="/profile" component={ProfileView} />
						<Route path="/events" component={EventView} />
						<Route path="/add_event" component={AddEvent} />
						<Route path="/event" component={EventDetails} />
						<Route path="/review" component={ReviewView} />
						<Route path="/invitations" component={InvitationView} />
						<Route path="/admin_panel" component={UsersView} />
						<Route path="/my_invitations" component={InvitationView} />
						<Route path="/event_invitations" component={EventInvitations} />
						<Route path="/my_reviews" component={ReviewView} />
						{/* <Route path="/issue_review" component={AddReview} /> */}
						<Route path="/my_events" component={ProfileEvents} />
						<Route path="/manage_events" component={ManageEvents} />
					</AuthContext.Provider>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;