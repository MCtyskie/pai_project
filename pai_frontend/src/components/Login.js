import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./login.css"


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            email: '',
            password: '',
            validated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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

    handleLogin(event) {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form);
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.setState({ validated: true });
            const backend_url = "http://localhost:8081/api/auth/signin";
            axios.post(backend_url, {
                email: this.state.email,
                password: this.state.password,
            }).then(response => {
                console.log(response.data);
                (response.status == 200) ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            }).catch(err => {
                console.log("failed to login");
                console.log(err);
            })
        }
    }

    render() {
        let loginForm;
        if (this.state.isLogged === false) {
            loginForm =
                (<Form className="form-container" validated={this.state.validated} onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="text" name="email" onChange={this.handleChange} placeholder="Enter Email" />
                        <Form.Control.Feedback type="invalid">
                            Please input a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please input a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" className="submit-btn" type="submit">
                        Login
                    </Button>
                </Form>);
        }
        return (
            <div className="login-container">
                {loginForm}
                <div className="form-container">
                    <h3>Don't have an account? Click here!</h3>
                    <Link to="/signup">
                        <Button variant="primary" className="submit-btn">
                            Signup now!
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export { Login };