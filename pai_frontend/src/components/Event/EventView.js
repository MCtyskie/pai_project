import DateFnsUtils from '@date-io/date-fns';
import { LinearProgress, TextField } from '@material-ui/core';
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
			isFetchingData: true,
			cities: [],
			selected_city: "",
			searchByTag: "",
			event_start_date: null,
			event_end_date: null,
			event_time_start: null,
			event_time_end: null,
			eventList: [],
		}
		this.fetchAllCities = this.fetchAllCities.bind(this);
		this.fetchAllEvents = this.fetchAllEvents.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.fetchFilteredEvents = this.fetchFilteredEvents.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		if (this.context.getToken() !== undefined && this.context.getToken() !== null) {
			this.fetchAllEvents();
			this.fetchAllCities();
		}
	}

	fetchAllEvents() {
		const backend_url = "http://localhost:8081/api/event/events";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			}
		})
			.then(response => {
				this.setState({ eventList: response.data, isFetchingData: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false });

			})
	}

	fetchFilteredEvents() {
		const backend_url = "http://localhost:8081/api/event/events_filter";
		let filterData = {
			city: this.state.selected_city,
			tags: this.state.searchByTag,
			date_start: this.state.event_start_date,
			date_end: this.state.event_end_date,
			time_start: this.state.event_time_start === null ? "" :this.state.event_time_start.toLocaleTimeString(),
			time_end: this.state.event_time_end === null ? "" :this.state.event_time_end.toLocaleTimeString(),
		};
		let config = {
			method: "post",
			url: backend_url,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
				"Content-Type": "application/json"
			},
			data: filterData
		};
		axios(config)
			.then(response => {
				this.setState({ eventList: response.data, isFetchingData: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isFetchingData: false });
			})
	}

	fetchAllCities() {
		const backend_url = "http://localhost:8081/api/event/cities";
		axios.get(backend_url, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
			}
		})
			.then(response => {
				this.setState({ cities: response.data });
			})
			.catch(err => {
				console.log(err);
			})
	}

	handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


	handleReset() {
		this.setState({ selected_city: "", searchByTag: "", event_start_date: null, event_end_date: null, event_time_start: null, event_time_end: null })
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
									getOptionSelected={(option, value) => {
										if(value === "" || value === option) { return true; }
									}}
									style={{ width: "20%" }}
									renderInput={(params) => <TextField {...params} label="City" color="primary" variant={"outlined"} />}
								/>
  								<TextField 
								  id="tags-filter" 
								  label="Tag" 
								  variant="outlined"
								  name="searchByTag"
								  value={this.state.searchByTag}
								  onChange={this.handleChange}
								  style={{ width: "20%" }}
								/>
							</div>
							<div className="row-container">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="yyyy-MM-dd"
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
										format="yyyy-MM-dd"
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
											this.setState({ event_time_start: newValue });
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
								<Button variant="primary" className="filter-button" onClick={this.fetchFilteredEvents}>
									Search
								</Button>
							</div>
						</div>
						{this.state.isFetchingData ? <LinearProgress style={{ width: "100%" }} /> : <EventListing events={this.state.eventList}></EventListing>}
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
