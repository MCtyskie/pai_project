import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { UserInfo } from './UserInfo';
import AuthContext from './../AuthContext';
import EventRow from '../Event/EventRow';


class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: true,
			incomingEvents: [],
			pastEvents: [],
		}
		this.prepareUserView = this.prepareUserView.bind(this);
		this.fetchUserIncomingEvents = this.fetchUserIncomingEvents.bind(this);
		this.fetchUserFinishedEvents = this.fetchUserFinishedEvents.bind(this);
	}

	componentDidMount() {
		this.fetchUserIncomingEvents();
	}


	fetchUserIncomingEvents() {
		const backend_url = "http://localhost:8081/api/event/incoming_events";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			}
		})
			.then(response => {
				this.setState({ incomingEvents: response.data }, () => this.fetchUserFinishedEvents());
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false });
			})
	}

	fetchUserFinishedEvents() {
		const backend_url = "http://localhost:8081/api/event/finished_events";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			}
		})
			.then(response => {
				this.setState({ pastEvents: response.data, isFetchingData: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false });
			})
	}

	prepareUserView = () => {
		if (!this.context.isAuthorized()) {
			this.props.history.push("/login");
		}
		let incomingEventsPage = [];
		let pastEventsPage = [];
		let fullPage;
		this.state.incomingEvents.forEach(eventItem => {
			incomingEventsPage.push(
				<EventRow item={eventItem}></EventRow>
			)
		});
		this.state.pastEvents.forEach(eventItem => {
			pastEventsPage.push(
				<EventRow item={eventItem}></EventRow>
			)
		});
		fullPage = (
			<div className="user-view-container">
				<UserInfo />
				<div className="user-events-container">
					<div className='user-incoming-container'>
						Incoming future events
						{incomingEventsPage}
					</div>
					<div className='user-finished-events'>
						Last finished events
						{pastEventsPage}
					</div>
				</div>
			</div>
		)
		return fullPage
	}

	render() {
		return (
			<div>
			
				{this.state.isFetchingData ? "fetching data..." : this.prepareUserView()}
			</div>
		);
	}
}

ProfileView.contextType = AuthContext;

export { ProfileView };