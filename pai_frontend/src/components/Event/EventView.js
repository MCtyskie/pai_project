import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
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
		this.prepareTable = this.prepareTable.bind(this);
	}

	componentDidMount() {
		console.log("Loaded Event views");
		this.fetchAllEvents();
	}

	fetchAllEvents() {
		console.log("TODO fetch events");
		this.setState({ isFetchingData: true });
		// const backend_url = "http://localhost:8081/event/events";
		// axios.get(backend_url)
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
					"adress": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": "true",
					"invitationsAccepted": "23",
					"maxGuests": "100",
					"picture": "JPG",
				},
				{
					"title": "meloinferno",
					"date": "2021-04-19 19:00:00",
					"adress": "Bydgoszcz 85 - 435 Puławska 13",
					"ageRestriction": "true",
					"invitationsAccepted": "23",
					"maxGuests": "100",
					"picture": "JPG",
				}
			], isFetchingData: false
		}, () => console.log(this.state.eventList));
	}

	prepareTable() {
		let eventPage;
		if (this.state.eventList.length !== 0) {
			let headers = Object.values(this.state.eventList)[0];
			let header = Object.keys(headers);

			eventPage =
				(<Table responsive>
					<thead>
						<tr>
							{header.map((k, i) => <th key={i}>{k}</th>)}
						</tr>
					</thead>
					<tbody>
						{
							this.state.eventList.map((r, i) => (
								<tr key={i}>{
									Object.values(r).map((resval, j) => <td key={j}>{resval.toString()}</td>)
								}
								</tr>
							))
						}
					</tbody>
				</Table>)
		}
		return eventPage;
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