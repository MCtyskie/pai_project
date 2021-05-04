import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


class ProfileMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: false,
			userData: {},
			incomingEvents: [],
			pastEvents: [],
		}
		this.fetchUserDetails = this.fetchUserDetails.bind(this);
		this.prepareUserView = this.prepareUserView.bind(this);
		this.fetchUserIncomingEvents = this.fetchUserIncomingEvents.bind(this);
		this.fetchUserFinishedEvents = this.fetchUserFinishedEvents.bind(this);
	}

	componentDidMount() {
		console.log("Loaded My Profile");
		this.fetchUserDetails();
	}

	fetchUserDetails() {
		// this.setState({ isFetchingData: true });
		// const backend_url = "http://localhost:8081/user/profile";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ userData: response.data, isFetchingData: false });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		this.setState({ isFetchingData: false });
		// 	})
		let dummy_data = {
			"userID": 1,
			"name": "Jan",
			"lastName": "Kowalsky",
			"email": "jkowal@test.com",
			"city": "TestCity",
			"phone": "987987987"
		}
		this.setState({ userData: dummy_data }, () => this.fetchUserIncomingEvents())
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
		let dummy_data = [
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
		this.setState({ incomingEvents: dummy_data }, () => this.fetchUserFinishedEvents);
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
		let dummy_data = [
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
		this.setState({ pastEvents: dummy_data });
	}

	prepareUserView = () => {
		let userPage = [];
		let incomingEventsPage = [];
		let pastEventsPage = [];
		let fullPage;
		for (const eventItem of this.state.incomingEvents) {
			incomingEventsPage.push(
				<div className="row-container">
					<div className="event-date">{eventItem.date}</div>
					<div className="event-title">{eventItem.title}</div>
					<div className="event-address">{eventItem.address}</div>
				</div>
			)
		}
		console.log(this.state.pastEvents);
		for (const eventItem of this.state.pastEvents) {
			pastEventsPage.push(
				<div className="row-container">
					<div className="event-date">{eventItem.date}</div>
					<div className="event-title">{eventItem.title}</div>
					<div className="event-address">{eventItem.address}</div>
					<Button variant="primary">Review</Button>
				</div>
			)
		}
		fullPage = (
			<div className="profile-container">
				<div className="user-info">
					{userPage}
				</div>
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

export { ProfileMenu };