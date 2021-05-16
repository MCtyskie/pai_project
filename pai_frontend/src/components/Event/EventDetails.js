import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavHashLink } from 'react-router-hash-link';
import { Checkbox } from '@material-ui/core';
import "./event.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			eventInvitations: [],
			eventReviews: [],
		}
		this.fetchEventAllData = this.fetchEventAllData.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
	}

	componentDidMount() {
		console.log(this.props.location.query.eventItem);
	}

	fetchEventAllData() {
		// TODO check name implemented in backend
		const backend_url = "http://localhost:8081/api/event/events_details";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			},
			params: {
				eventID: this.props.location.query.eventItem.eventId,
			}
		})
			.then(response => {
				console.log(response.data);
				this.setState({ eventInvitations: response.data.invitations, eventReviews: response.data.reviews });
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleJoin() {
		// TODO check name implemented in backend
		const backend_url = "http://localhost:8081/api/event/event_join";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			},
			params: {
				eventID: this.props.location.query.eventItem.eventId,
			}
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		return (
			<div className="event-details-container">
				<div className="event-title">
					{this.props.location.query.eventItem.title}
				</div>
				<div className="row-container">
					<div className="event-photo">{this.props.location.query.eventItem.picture}</div>
					<div className="event-main-info">{this.props.location.query.eventItem.date}</div>
					<div className="event-main-info">{this.props.location.query.eventItem.address}</div>
				</div>
				<div className="row-container">
					<div className="event-lower-info">Over 18?<Checkbox checked={this.props.location.query.eventItem.ageRestriction} disabed className="checkbox"></Checkbox></div>
					<div className="event-lower-info">Invitations: {this.props.location.query.eventItem.invitationsAccepted}/{this.props.location.query.eventItem.maxGuests}</div>
					<div className="event-lower-info">{this.props.location.query.eventItem.tags}</div>
				</div>
				<Button variant="primary" onClick={this.handleJoin}>Join</Button>
				{/* TODO test nav scroll */}
				<Nav className="justify-content-center">
					<NavHashLink smooth to="/event#description">
						Description
					</NavHashLink>
					<NavHashLink smooth to="/event#invitations">
						Invitations
					</NavHashLink>
					<NavHashLink smooth to="/event#reviews">
						Reviews
					</NavHashLink>
				</Nav>

				<section id="description">
					{this.props.location.query.eventItem.description}
				</section>
				<section id="invitations">
					{this.state.eventInvitations}
				</section>
				<section id="reviews">
					{this.state.eventReviews}
				</section>
			</div>
		);
	}
}

export { EventDetails };