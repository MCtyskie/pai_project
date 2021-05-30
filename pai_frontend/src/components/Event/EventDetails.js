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
			isFetchingData: true,
			eventItem: null,
			eventInvitations: [],
			eventReviews: [],
		}
		this.prepareEventDetailsView = this.prepareEventDetailsView.bind(this);
		this.fetchEventAllData = this.fetchEventAllData.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
	}

	componentDidMount() {
		this.setState({eventItem: this.props.location.query.eventItem }, () => this.fetchEventAllData());
		// if location query is empty maybe store ID somehow and fetch normally by backend request? change link to /event/<id> maybe?
	}

	fetchEventAllData() {
		const backend_url = "http://localhost:8081/api/event/details";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			},
			params: {
				eventID: this.state.eventItem.eventID,
			}
		})
			.then(response => {
				console.log(response.data);
				this.setState({ eventInvitations: response.data.invitations, eventReviews: response.data.reviews, isFetchingData: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false });
			})
	}

	handleJoin() {
		// TODO check name implemented in backend
		const backend_url = "http://localhost:8081/api/event/join";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			},
			params: {
				eventID: this.state.eventItem.eventId,
			}
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	prepareEventDetailsView() {
		// TODO Temporary as backend is not ready for array type yet
		let eventTags = this.state.eventItem.tags.split(",");
		let eventChips = [];
		eventTags.forEach(tag => {
			eventChips.push(<Chip color="primary" label={tag} />)
		})
		return (
			<div className="event-details-container">
				<div className="event-title">
					{this.state.eventItem.title}
				</div>
				<div className="row-container">
					<div className="event-photo">{this.state.eventItem.picture}</div>
					<div className="event-main-info">{this.state.eventItem.date}</div>
					<div className="event-main-info">{this.state.eventItem.city}, {this.state.eventItem.street}</div>
				</div>
				<div className="row-container">
					<div className="event-lower-info">Over 18?<Checkbox checked={this.state.eventItem.ageRestriction} disabed className="checkbox"></Checkbox></div>
					<div className="event-lower-info">Invitations: {this.state.eventItem.invitationsAccepted}/{this.state.eventItem.maxGuests}</div>
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
					{this.state.eventItem.description}
				</div>
				<div id="event-invitations">
					{this.state.eventInvitations}
				</div>
				<div id="event-reviews">
					{this.state.eventReviews}
				</div>
				<AddReview eventID={this.props.location.query.eventItem.eventID}></AddReview>
			</div>
		);
	}

	render() {
		return (
			<>
				{this.state.isFetchingData ? "fetching data..." : this.prepareEventDetailsView()}
			</>
		)

	}
}

export { EventDetails };