import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';


class EventFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: [],
			tags: [],
			selected_city: "",
			selected_tags: "",
			event_start_date: null,
			event_end_date: null,
			event_time_start: null,
			event_time_end: null,
		}
		this.fetchAllCities = this.fetchAllCities.bind(this);
		this.fetchTags = this.fetchTags.bind(this);
	}

	componentDidMount() {
		console.log("Loaded filter");
		// Endpoint for fetching all cities?
		this.fetchAllCities();
		// Endpoint for fetching possible tags? or join them together somehow so data is dict {'tags':[], 'cities':[],..}
		this.fetchTags();
	}

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

	fetchTags() {
		// const backend_url = "http://localhost:8081/api/event/tags";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ tags: response.data});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
		let dummy_data = [
			"Rave",
			"Rock",
			"Dance",
		];
		this.setState({ tags: dummy_data });
	}


	render() {
		return (
			// Filter by tags, city, date, name, agerestricted
			<div className="event-filter-container">
				<Autocomplete
					id="city-filter"
					options={this.state.cities}
					value={this.state.selected_city}
					onChange={(event, newValue) => {
						this.setState({ selected_city: newValue });
					}}
					renderInput={(params) => <TextField {...params} label="City" color="primary" variant={"outlined"} />}
				/>
				<Autocomplete
					id="tags-filter"
					options={this.state.tags}
					value={this.state.selected_tags}
					onChange={(event, newValue) => {
						this.setState({ selected_tags: newValue });
					}}
					renderInput={(params) => <TextField {...params} label="Tag" color="primary" variant={"outlined"} />}
				/>
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
					<KeyboardTimePicker
						variant="inline"
						margin="normal"
						id="event-time-start"
						label="Time from"
						value={this.state.event_time_start}
						onChange={(event, newValue) => {
							this.setState({ event_time_start: newValue });
						}}
						KeyboardButtonProps={{
							'aria-label': 'change time',
						}}
					/>
					<KeyboardTimePicker
						variant="inline"
						margin="normal"
						id="event-time-end"
						label="Time to"
						value={this.state.event_time_end}
						onChange={(event, newValue) => {
							this.setState({ event_time_end: newValue });
						}}
						KeyboardButtonProps={{
							'aria-label': 'change time',
						}}
					/>
				</MuiPickersUtilsProvider>
			</div>
		);
	}
}

export { EventFilter };