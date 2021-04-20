import axios from 'axios';
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "./login.css"


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            birthdate: '',
            city: '',
            phone: '',
            validated: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSingup = this.handleSingup.bind(this);
    }

    componentDidMount() {
        console.log("Loaded Signup Page");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSingup(event) {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form);
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.setState({ validated: true });
            const backend_url = "http://localhost:8081/api/auth/signup";
            axios.post(backend_url, {
                name: this.state.name,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                birthdate: this.state.birthdate,
                city: this.state.city,
                phone: this.state.phone,
            }).then(response => {
                console.log(response.data);
                (response.status == 200) ? this.setState({ isLogged: true }) : this.setState({ isLogged: false })
            }).catch(err => {
                console.log("something wrong happend");
                console.log(err);
            })
        }
    }

    render() {
        let inputForm =
            (<Form className="form-container" validated={this.state.validated} onSubmit={this.handleSingup}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name="name" onChange={this.handleChange} placeholder="Enter name" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid name.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control required type="text" name="lastName" onChange={this.handleChange} placeholder="Enter surname" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid surname.
                        </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control required type="text" name="city" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid City.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control required type="text" name="Phone" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid phone number.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                    />
                </Form.Group>

                <Button variant="primary" className="submit-btn" type="submit">
                    Signup!
                    </Button>
            </Form>);
        return (
            <div className="login-container">
                {inputForm}
            </div>
        );
    }
}

export { Signup };