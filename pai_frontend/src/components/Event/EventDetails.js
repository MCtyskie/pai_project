import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavHashLink } from 'react-router-hash-link';
import { Checkbox } from '@material-ui/core';
import "./event.css";


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		console.log(this.props.location.query.eventItem);
	}

	fetchEventAllData() {
		// Maybe fetch whole data and use in props?
	}

	render() {
		return (
			<div className="event-details-container">
				<div className="event-title">
					{this.props.location.query.eventItem.title}
				</div>
					<div className="row-container">
						<div className="event-photo">{this.props.location.query.eventItem.picture}</div>
						<div className="event-main-info">{this.props.location.query.eventItem.date}</div>
						<div className="event-main-info">{this.props.location.query.eventItem.address}</div>
					</div>
					<div className="row-container">
						<div className="event-lower-info">Over 18?<Checkbox checked={this.props.location.query.eventItem.ageRestriction} disabed className="checkbox"></Checkbox></div>
						<div className="event-lower-info">Invitations: {this.props.location.query.eventItem.invitationsAccepted}/{this.props.location.query.eventItem.maxGuests}</div>
						<div className="event-lower-info">{this.props.location.query.eventItem.tags}</div>
					</div>
					{/* TODO test nav scroll */}
				<Nav className="justify-content-center">
					<NavHashLink smooth to="/event#description">
						Description
					</NavHashLink>
					<NavHashLink smooth to="/event#invitations">
						Invitations
					</NavHashLink>
					<NavHashLink smooth to="/event#reviews">
						Reviews
					</NavHashLink>
				</Nav>

				<div id="description">
					{this.props.location.query.eventItem.description}
				</div>
				<div id="invitations">

				</div>
				<div id="reviews">

				</div>
			</div>
		);
	}
}

export { EventDetails };