import React, {Component} from 'react';
import {Toolbar} from './components/Toolbar';
import {ProfileMenu} from './components/Profile';
import {WelcomeMenu} from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom";
import { EventView } from './components/Event/EventView';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Logout } from './components/Logout';
import { AddEvent } from './components/Event/AddEvent';
import { EventDetails } from './components/Event/EventDetails';

class App extends Component{

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
				<Toolbar/>
				<Route exact path="/" component={WelcomeMenu} />
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/profile" component={ProfileMenu} />
				<Route path="/events" component={EventView} />
				<Route path="/add_event" component={AddEvent} />
				<Route path="/event" component={EventDetails} />
			</BrowserRouter>
		</div>
		);
	}
}

export default App;