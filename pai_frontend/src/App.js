import React, {Component} from 'react';
import {Toolbar} from './components/Toolbar';
import {ProfileMenu} from './components/Profile';
import {WelcomeMenu} from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom";
import { EventView } from './components/EventView';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

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
				<Route path="/profile" component={ProfileMenu} />
				<Route path="/events" component={EventView} />
			</BrowserRouter>
		</div>
		);
	}
}

export default App;