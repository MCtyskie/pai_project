import React from 'react';
import { Checkbox } from '@material-ui/core';
import "./event.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-scroll'
import Chip from '@material-ui/core/Chip';
import { AddReview } from '../Review/AddReview';


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
		// if location query is empty maybe get id somehow and fetch normally by backend request? change link to /event/<id> maybe?
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
		// Temporary as backend is not ready for array type yet
		let eventTags = this.props.location.query.eventItem.tags.split(",");
		let eventChips = [];
		console.log(eventTags);
		eventTags.forEach(tag => {
            eventChips.push(<Chip color="primary" label={tag} />)
        })
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
					<div className="event-lower-info">{eventChips}</div>
				</div>
				<Button variant="primary" onClick={this.handleJoin}>Join Event</Button>
				<div className="event-nav-details">
					<Link
						to="description"
						smooth={true}
						spy={true}>
						Description
					</Link>
					<Link
						to="event-invitations"
						smooth={true}
						spy={true}>
						Invitations
					</Link>
					<Link
						to="event-reviews"
						smooth={true}
						spy={true}>
						Reviews
					</Link>
				</div>

				<div id="description">
					{this.props.location.query.eventItem.description}
				</div>
				<div id="event-invitations">
					{this.state.eventInvitations}
				</div>
				<div id="event-reviews">
					{this.state.eventReviews}
				</div>
				<AddReview eventId={this.props.location.query.eventItem.eventId}></AddReview>
			</div>
		);
	}
}

export { EventDetails };