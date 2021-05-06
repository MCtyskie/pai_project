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

function getToken(){
	return localStorage.getItem('token');
}

function isLogged(){
	let token = getToken();
	if(token !== undefined && token !== null){
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
	}


	render() {
		return (
			<div>
				<BrowserRouter>
					<Toolbar />
					<Route path="/signup" component={Signup} />
					<AuthContext.Provider value={{ getToken: getToken, isAuthorized: isLogged }}>
						<Route path="/login" component={Login} />
						<Route exact path="/" component={WelcomeMenu} />
						<Route path="/logout" component={Logout} />
						<Route path="/profile" component={ProfileView} />
						<Route path="/events" component={EventView} />
						<Route path="/add_event" component={AddEvent} />
						<Route path="/event" component={EventDetails} />
						<Route path="/review" />
					</AuthContext.Provider>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;