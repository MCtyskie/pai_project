import React from 'react';
import axios from 'axios';
import "./event.css"

class EventView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: false,
			eventList: [],
		}
		this.fetchAllEvents = this.fetchAllEvents.bind(this);
		this.dummyEvents = this.dummyEvents.bind(this);
	}

	componentDidMount() {
		console.log("Loaded Event views");
		this.fetchAllEvents();
	}

	fetchAllEvents() {
		console.log("TODO fetch events");
		this.setState({ isFetchingData: true });
		const backend_url = "http://localhost:8081/event/events";
		axios.get(backend_url)
			.then(response => {
				this.setState({ eventList: response.data, isFetchingData: false });
			})
			.catch(err => {
				console.log(err);

				this.setState({ isFetchingData: false });
			})
		this.dummyEvents();
	}

	dummyEvents = () => {
		this.setState({
			eventList: [
				{
					"title": "meloinferno",
					"date": "2021-04-19 19:00:00",
					"adress": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": true,
					"invitationsAccepted": 23,
					"maxGuests": 100,
					"picture": "JPG",
				},
				{
					"title": "meloinferno",
					"date": "2021-04-19 19:00:00",
					"adress": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": true,
					"invitationsAccepted": 23,
					"maxGuests": 100,
					"picture": "JPG",
				}
			]
		}, () => console.log(this.state.eventList));
	}

	render() {
		let eventPage;

		return (
			<div className="event-container">
				{eventPage}
			</div>
		);
	}
}

export { EventView };