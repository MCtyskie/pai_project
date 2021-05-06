import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { UserInfo } from './UserInfo';
import AuthContext from './../AuthContext';


class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: false,
			incomingEvents: [],
			pastEvents: [],
		}
		this.prepareUserView = this.prepareUserView.bind(this);
		this.fetchUserIncomingEvents = this.fetchUserIncomingEvents.bind(this);
		this.fetchUserFinishedEvents = this.fetchUserFinishedEvents.bind(this);
	}

	componentDidMount() {
		console.log("Loaded My Profile");
	}

	
	fetchUserIncomingEvents() {
		// this.setState({ isFetchingData: true });
		// const backend_url = "http://localhost:8081/user/incoming";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ incomingEvents: response.data, isFetchingData: false });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		this.setState({ isFetchingData: false });
		// 	})
		
	}

	fetchUserFinishedEvents() {
		// this.setState({ isFetchingData: true });
		// const backend_url = "http://localhost:8081/user/incoming";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ pastEvents: response.data, isFetchingData: false });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		this.setState({ isFetchingData: false });
		// 	})
	}

	prepareUserView = () => {
		if(!this.context.isAuthorized()){
			this.props.history.push("/login");
		}
		let incomingEventsPage = [];
		let pastEventsPage = [];
		let fullPage;
		let dummy_data_past = [
			{
				"title": "bylo melo",
				"date": "2021-04-19 19:00:00",
				"address": "Bydgoszcz 85 - 435 Puławska 13",

			},
			{
				"title": "bylo dwojeczka",
				"date": "2021-04-29 19:00:00",
				"address": "Bydgoszcz 85 - 435 Puławska 1",

			}
		]
		let dummy_data_incoming = [
			{
				"title": "meloinferno",
				"date": "2021-04-19 19:00:00",
				"address": "Bydgoszcz 85 - 435 Puławska 13",

			},
			{
				"title": "dwojeczka",
				"date": "2021-04-29 19:00:00",
				"address": "Bydgoszcz 85 - 435 Puławska 1",

			}
		]
		// TODO maybe do a separate component for those submenus?
		for (const eventItem of dummy_data_incoming) {
			incomingEventsPage.push(
				<div className="row-container">
					<div className="event-date">{eventItem.date}</div>
					<div className="event-title">{eventItem.title}</div>
					<div className="event-address">{eventItem.address}</div>
				</div>
			)
		}
		for (const eventItem of dummy_data_past) {
			// for (const eventItem of this.state.pastEvents) {
			pastEventsPage.push(
				<div className="row-container">
					<div className="event-date">{eventItem.date}</div>
					<div className="event-title">{eventItem.title}</div>
					<div className="event-address">{eventItem.address}</div>
					<Link to={{ pathname: "/review", query: { eventItem } }}>
						<Button variant="primary">Review</Button>
					</Link>
				</div>
			)
		}
		fullPage = (
			<div className="profile-container">
				<UserInfo />
				<div className='user-incoming-events'>
					{incomingEventsPage}
				</div>
				<div className='user-finished-events'>
					{pastEventsPage}
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