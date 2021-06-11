import React from 'react';
import { Checkbox } from '@material-ui/core';
import "./event.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-scroll'
import Chip from '@material-ui/core/Chip';
import { AddReview } from '../Review/AddReview';
import Alert from 'react-bootstrap/Alert'


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: true,
			isFetchingError: false,
			eventItem: null,
			eventInvitations: [],
			eventReviews: [],
			sentJoin: false,
		}
		this.prepareEventDetailsView = this.prepareEventDetailsView.bind(this);
		this.fetchEventAllData = this.fetchEventAllData.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
	}

	componentDidMount() {
		this.setState({ eventItem: this.props.location.query.eventItem }, () => this.fetchEventAllData());
		// if location query is empty maybe store ID somehow and fetch normally by backend request? change link to /event/<id> maybe?
	}

	fetchEventAllData() {
		// TODO reformat this bcs of many shots - different functions
		let backend_url = "http://localhost:8081/api/event/details";
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
				this.setState({
					eventItem: response.data.first,
					eventInvitations: response.data.second.second,
					eventReviews: response.data.second.first,
					isFetchingData: false
				})
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false, isFetchingError: true });
			});
	}

	handleJoin() {
		const backend_url = "http://localhost:8081/api/invitation/join";
		axios.post(backend_url, {}, {
			params: {
				eventID: this.state.eventItem.eventID,
			},
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			}
		})
			.then(response => {
				console.log(response.data);
				this.setState({ sentJoin: true });
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
			eventChips.push(<Chip color="primary" key={tag} label={tag} />)
		});
		let invitations = [];
		let acceptedInvitationsCounter = 0;
		this.state.eventInvitations.forEach(invite =>{
			if(invite.status === "ACCEPTED"){
				acceptedInvitationsCounter += 1;
			}
			invitations.push(<div>Status of invitation: {invite.status} | invited user: {invite.invitedID}</div>)
		});
		let reviews = [];
		this.state.eventReviews.forEach(review =>{
			reviews.push(<div>Rate: {review.rate} | reviewer user: {review.userID} | description : {review.description}</div>)
		});
		let eventAddress = this.state.eventItem.city + ", " + this.state.eventItem.street + " " + this.state.eventItem.apartmentNumber;
		return (
			<div className="event-details-container">
				<div className="event-title">
					{this.state.eventItem.title}
				</div>
				<div className="row-container">
					<div className="event-photo">{this.state.eventItem.picture}</div>
					<div className="event-photo">Event is {this.state.eventItem.activity}</div>
					<div className="event-main-info">{this.state.eventItem.eventDate}</div>
					<div className="event-main-info">{eventAddress}</div>
				</div>
				<div className="row-container">
					<div className="event-lower-info">Over 18?<Checkbox checked={this.state.eventItem.ageRestriction} disabled className="checkbox"></Checkbox></div>
					<div className="event-lower-info">Accepted invitations: {acceptedInvitationsCounter}/{this.state.eventItem.maxGuests}</div>
					<div className="event-lower-info">{eventChips}</div>
				</div>
				<Button variant="primary" onClick={this.handleJoin} disabled={this.state.sentJoin}>Join Event</Button>
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
					{invitations}
				</div>
				<div id="event-reviews">
					{reviews}
				</div>
				<AddReview eventID={this.props.location.query.eventItem.eventID}></AddReview>
			</div>
		);
	}

	render() {
		if (this.state.isFetchingError) {
			return <Alert variant="warning">
				<Alert.Heading>
					Failed to get/send data
				</Alert.Heading>
				Something happend during data transfer...<br />
				<Alert.Link href="/events">Go back to previous page</Alert.Link>
			</Alert>
		}
		return (
			<>
				{this.state.isFetchingData ? "fetching data..." : this.prepareEventDetailsView()}
			</>
		)

	}
}

export { EventDetails };