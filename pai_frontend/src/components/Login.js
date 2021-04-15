import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "./login.css"

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            isLogged: false,
            username : '',
			password : '',
		}
	}

	componentDidMount() {
	    console.log("Loaded Login Page");
	}

    handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
		  [name]: value    
		});
	}

    handleLogin(event){
        event.preventDefault();
        const backend_url = "http://localhost:8081/login";
        axios.post(backend_url, {
            username: this.state.username,
            password: this.state.password,
        }).then(response =>{
            console.log(response.data);
            (response.status == 200) ? this.setState({ isLogged: true }) : this.setState({ isLogged: false})
        }).catch(err =>{
            console.log("failed to login");
            console.log(err);
        })
    }

	render() {
        let loginForm;
		if (this.state.isLogged === false) {
			loginForm =
				(<Form className="form-container">
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" name="username" onChange={this.handleChange} placeholder="Enter username" />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
					</Form.Group>
                    <Button variant="primary" className="submit-btn" type="submit" onClick={this.handleLogin}>
                        Login
                    </Button>
				</Form>);
		}
		return (
			<div className="login-container">
                {loginForm}
            </div>
		);
	}
}

export {Login};