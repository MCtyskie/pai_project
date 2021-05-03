import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


class AddEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            title: "",
            city: "",
            postNumber: "",
            street: "",
            eventDate: "",
            activity: false,
            visibility: false,
            tags: "",
            maxGuest: "",
            description: "",
            ageRestriction: false,
            openEvent: false,
		}
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {
	}

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleAdd(event) {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form);
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            this.setState({ validated: true });
            const backend_url = "http://localhost:8081/api/event/add";
            axios.post(backend_url, {
                title: this.state.title,
                city: this.state.city,
                postNumber: this.state.postNumber,
                street: this.state.street,
                eventDate: this.state.date,
                // activity: this.state.activity, ??
                visibility: this.state.visibility,
                tags: this.state.tags,
                maxGuest: this.state.maxGuest,
                description: this.state.description,
                ageRestriction: this.state.ageRestriction,
                openEvent: this.state.open,
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
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" name="title" onChange={this.handleChange} placeholder="Enter title" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid title.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control required type="text" name="city" onChange={this.handleChange} placeholder="Enter city" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid City.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPostNumber">
                    <Form.Label>Post Number</Form.Label>
                    <Form.Control required type="text" name="postNumber" onChange={this.handleChange} placeholder="Enter post code" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid zip code.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control required type="text" name="street" onChange={this.handleChange} placeholder="Enter street" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid Street name.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEventDate">
                    <Form.Label>Date of Event</Form.Label>
                    <Form.Control required type="date" name="date" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid date.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicMaxGuests">
                    <Form.Label>Maximal number of guests</Form.Label>
                    <Form.Control required type="number" name="maxGuests" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid number.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="visibility"
                        onChange={this.handleChange}
                        label="Event Visible now?"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="open"
                        onChange={this.handleChange}
                        label="Open party?"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="ageRestriction"
                        onChange={this.handleChange}
                        label="Age restriction (over 18)?"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" onChange={this.handleChange} rows={3}/>
                </Form.Group>

                <Button variant="primary" className="submit-btn" type="submit">
                    Create Event!
                    </Button>
            </Form>);
        return (
            <div className="login-container">
                {inputForm}
            </div>
        );
    }
}

export { AddEvent };