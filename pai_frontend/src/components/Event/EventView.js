import React from 'react';
import axios from 'axios';
import "./event.css"
import EventCard from './EventCard';
import { Link } from "react-router-dom";

class EventView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetchingData: false,
			eventList: [],
		}
		this.fetchAllEvents = this.fetchAllEvents.bind(this);
		this.dummyEvents = this.dummyEvents.bind(this);
		this.prepareTable = this.prepareTable.bind(this);
	}

	componentDidMount() {
		console.log("Loaded Event views");
		this.fetchAllEvents();
	}

	fetchAllEvents() {
		// this.setState({ isFetchingData: true });
		// const backend_url = "http://localhost:8081/api/event/events";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0,-1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ eventList: response.data, isFetchingData: false });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);

		// 		this.setState({ isFetchingData: false });
		// 	})
		this.dummyEvents();
	}

	dummyEvents = () => {
		this.setState({
			eventList: [
				{
					"title": "meloinferno",
					"date": "2021-04-19 19:00:00",
					"address": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": true,
					"invitationsAccepted": "23",
					"maxGuests": "100",
					"picture": "JPG",
					"description":"witajcie na testowym evencie melo inferno jak sie macie panowie haha",
				},
				{
					"title": "meloinferno",
					"date": "2021-05-03 20:30:00",
					"address": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": false,
					"invitationsAccepted": "0",
					"maxGuests": "100",
					"picture": "JPG",
					"description":"Drugi testowy event",
				}
			], isFetchingData: false
		}, () => console.log(this.state.eventList));
	}

	prepareTable() {
		let eventPage = [];
		// if (this.state.eventList.length !== 0) {
		// 	let headers = Object.values(this.state.eventList)[0];
		// 	let header = Object.keys(headers);

		// 	eventPage =
		// 		(<Table responsive>
		// 			<thead>
		// 				<tr>
		// 					{header.map((k, i) => <th key={i}>{k}</th>)}
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{
		// 					this.state.eventList.map((r, i) => (
		// 						<tr key={i}>{
		// 							Object.values(r).map((resval, j) => <td key={j}>{resval.toString()}</td>)
		// 						}
		// 						</tr>
		// 					))
		// 				}
		// 			</tbody>
		// 		</Table>)
		// }
		// return eventPage;
		if (this.state.eventList.length !== 0) {
			for (const eventItem of this.state.eventList) {
				eventPage.push(
					<Link to={{ pathname: "/event", query: { eventItem } }}>
						<EventCard item={eventItem}></EventCard>
					</Link>
				)
			}
		}

		return eventPage
	}

	render() {
		return (
			<div className="event-container">
				{this.state.isFetchingData ? "fetching data..." : this.prepareTable()}
			</div>
		);
	}
}

export { EventView };