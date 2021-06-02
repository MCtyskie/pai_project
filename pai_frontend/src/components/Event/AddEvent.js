import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import AuthContext from './../AuthContext';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';


class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            city: "",
            postNumber: "",
            street: "",
            apartmentNumber: "",
            eventDate: "",
            activity: "ACTIVE",
            visibility: "PUBLIC",
            tag: "",
            tags: [],
            maxGuests: "",
            description: "",
            ageRestriction: false,
            openEvent: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleTagInput = this.handleTagInput.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: target.type === "checkbox" ? target.checked : value
        });
    }

    handleTagInput() {
        let tagsList = this.state.tags;
        if (tagsList.length > 9) {
            console.log("alert, no more than 10 tags");
        }
        else if (this.state.tag.length > 20) {
            console.log("Alert, no longer than 20 chars!");
        }
        else {
            tagsList.push(this.state.tag);
            this.setState({ tags: tagsList, tag: "" });
        }
    }

    handleTagDelete(tag) {
        let newTags = this.state.tags.filter((item) => item !== tag);
        this.setState({ tags: newTags });
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
            const backend_url = "http://localhost:8081/api/event/createEvent";
            let eventDateTime = this.state.date+"T"+this.state.time;
            let tagsString = this.state.tags.join(",");
            console.log(tagsString);
            console.log(eventDateTime);
            axios.post(backend_url, {
                title: this.state.title,
                city: this.state.city,
                postNumber: this.state.postNumber,
                street: this.state.street,
                apartmentNumber: this.state.apartmentNumber,
                date: this.state.date,
                time: this.state.time,
                eventDate: eventDateTime,
                // activity: this.state.activity,
                activity: "ACTIVE",
                visibility: this.state.visibility,
                // tags: this.state.tags, THIS will be the final version, but for now i will parse them to string bcs backend is not ready
                tags: tagsString,
                maxGuests: this.state.maxGuests,
                description: this.state.description,
                ageRestriction: this.state.ageRestriction,
                openEvent: this.state.open,
                images: "",
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                }
            }).then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log("something wrong happend");
                console.log(err);
            })
        }
    }

    render() {
        let tags = [];
        this.state.tags.forEach(tag => {
            tags.push(<Chip color="primary" onDelete={() => { this.handleTagDelete(tag) }} label={tag} />)
        })
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


                <Form.Group controlId="formBasicApartmentNumber">
                    <Form.Label>Apartment/House Number</Form.Label>
                    <Form.Control required type="number" name="apartmentNumber" onChange={this.handleChange} placeholder="Enter number" />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid apartment number.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEventDate">
                    <Form.Label>Date of Event</Form.Label>
                    <Form.Control required type="date" name="date" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid date.
                        </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEventTime">
                    <Form.Label>Start time of Event at</Form.Label>
                    <Form.Control required type="time" name="time" onChange={this.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please input a valid time.
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
                    <Form.Label>Visibility of Event</Form.Label>
                    <Form.Control as="select" custom name="visibility" onChange={this.handleChange}> 
                        <option>PUBLIC</option>
                        <option>PRIVATE</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="open"
                        onClick={this.handleChange}
                        label="Open party?"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        name="ageRestriction"
                        onClick={this.handleChange}
                        label="Age restriction (over 18)?"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" onChange={this.handleChange} rows={3} />
                </Form.Group>

                <Form.Group controlId="inputTags" className="row-container">
                    <TextField id="tagsInput" value={this.state.tag} name="tag" label="Tag" variant="outlined" onChange={this.handleChange} />
                    <Button variant="primary" onClick={this.handleTagInput}>Add Tag</Button>
                </Form.Group>
                <Form.Group controlId="formTags">
                    {tags}
                </Form.Group>

                <Button variant="primary" onClick={this.handleAdd} className="submit-btn" type="submit">
                    Create Event!
                    </Button>
            </Form>);
        return (
            <div className="login-container">
                {this.context.isAuthorized() ? inputForm : this.props.history.push("/login")}
            </div>
        );
    }
}

AddEvent.contextType = AuthContext;

export { AddEvent };