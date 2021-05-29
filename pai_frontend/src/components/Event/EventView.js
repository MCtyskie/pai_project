import DateFnsUtils from '@date-io/date-fns';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import "./event.css";
import { EventListing } from './EventListing';
import AuthContext from './../AuthContext';
import { TimePicker } from "@material-ui/pickers";


class EventView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: [],
			selected_city: null,
			searchByTag: null,
			event_start_date: null,
			event_end_date: null,
			event_time_start: null,
			event_time_end: null,
			eventList:[],
		}
		this.fetchAllCities = this.fetchAllCities.bind(this);
		this.fetchAllEvents = this.fetchAllEvents.bind(this);
		this.handleReset = this.handleReset.bind(this);
		// this.dummyEvents = this.dummyEvents.bind(this);
	}

	componentDidMount() {
		if(this.context.getToken() !== undefined && this.context.getToken() !== null){
			this.fetchAllEvents();
			// Endpoint for fetching all cities?
			this.fetchAllCities();
		}
	}

	fetchAllEvents() {
		// this.setState({ isFetchingData: true });
		const backend_url = "http://localhost:8081/api/event/events";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0,-1)}`,
			},
			params: {
				city: this.state.selected_city,
				tag: this.state.searchByTag,
				date_start: this.state.event_start_date,
				date_end: this.state.event_end_date,
				time_start: this.state.event_time_start,
				time_end: this.state.event_time_end,
			}
		})
			.then(response => {
				console.log(response.data);
				// this.setState({ eventList: response.data, isFetchingData: false });
				this.setState({ eventList: response.data});
			})
			.catch(err => {
				console.log(err);
			})
		// this.dummyEvents();
	}

	// dummyEvents = () => {
	// 	this.setState({
	// 		eventList: [
	// 			{
	// 				"title": "meloinferno",
	// 				"date": "2021-04-19 19:00:00",
	// 				"address": "Bydgoszcz 85 - 435 Puławska 13",
	// 				"ageRestriction": true,
	// 				"invitationsAccepted": "23",
	// 				"maxGuests": "100",
	// 				"picture": "JPG",
	// 				"description": "witajcie na testowym evencie melo inferno jak sie macie panowie haha",
	// 				"tags": ["Dance", "Pop", "Biba"],
	// 			},
	// 			{
	// 				"title": "meloinferno",
	// 				"date": "2021-05-03 20:30:00",
	// 				"address": "Bydgoszcz 85 - 435 Puławska 13",
	// 				"ageRestriction": false,
	// 				"invitationsAccepted": "0",
	// 				"maxGuests": "100",
	// 				"picture": "JPG",
	// 				"description": "Drugi testowy event",
	// 				"tags": ["Rock", "Metal", "Alko"],
	// 			}
	// 		], isFetchingData: false
	// 	});
	// }

	fetchAllCities() {
		// const backend_url = "http://localhost:8081/api/event/cities";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ cities: response.data});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
		let dummy_data = [
			"Bydgoszcz",
			"Wrocław",
			"Gdańsk",
			"Łódź",
		];
		this.setState({ cities: dummy_data });
	}


	handleReset() {
		this.setState({ selected_city: null, selected_tags: null, event_start_date: null, event_end_date: null, event_time_start: null, event_time_end: null })
	}


	render() {
		return (
			<>
			{this.context.isAuthorized() ? (
			// Filter by tags, city, date, name, agerestricted
			<div className="event-container">
				<div className="event-filter-container">
					<div className="row-container">
						{/* Maybe add search here also? */}
						<Autocomplete
							id="city-filter"
							options={this.state.cities}
							value={this.state.selected_city}
							onChange={(event, newValue) => {
								this.setState({ selected_city: newValue });
							}}
							style={{ width: "20%" }}
							renderInput={(params) => <TextField {...params} label="City" color="primary" variant={"outlined"} />}
						/>
						{/* FreeSolo -> only one input as String from user */}
						<Autocomplete
							id="tags-filter"
							freeSolo
							options={[]}
							value={this.state.searchByTag}
							onChange={(event, newValue) => {
								this.setState({ searchByTag: newValue });
							}}
							style={{ width: "20%" }}
							renderInput={(params) => <TextField {...params} label="Tag" color="primary" variant={"outlined"} />}
						/>
					</div>
					<div className="row-container">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="event-date-start"
								label="Event Date from:"
								value={this.state.event_start_date}
								onChange={(event, newValue) => {
									this.setState({ event_start_date: newValue });
								}}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="event-date-end"
								label="Event Date to:"
								value={this.state.event_end_date}
								onChange={(event, newValue) => {
									this.setState({ event_end_date: newValue });
								}}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
							<TimePicker
								variant="inline"
								margin="normal"
								id="event-time-start"
								label="Time from"
								ampm={false}
								value={this.state.event_time_start}
								onChange={(newValue) => {
									this.setState({ event_time_start: newValue});
								}}
							/>
							<TimePicker
								variant="inline"
								margin="normal"
								id="event-time-end"
								label="Time to"
								ampm={false}
								value={this.state.event_time_end}
								onChange={(newValue) => {
									this.setState({ event_time_end: newValue });
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="button-container">
						<Button variant="secondary" className="filter-button" onClick={this.handleReset}>
							Reset
						</Button>
						<Button variant="primary" className="filter-button" onClick={this.fetchAllEvents}>
							Search
						</Button>
					</div>
				</div>
				<EventListing events={this.state.eventList}></EventListing>
			</div>) : (
				<div>
					{this.props.history.push("/login")}
				</div>
			)}
			</>
		);
	}
}

EventView.contextType = AuthContext;

export { EventView };
