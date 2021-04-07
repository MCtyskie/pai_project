import React, {Component} from 'react';
import {Toolbar} from './components/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom";

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
			</BrowserRouter>
		</div>
		);
	}
}

export default App;