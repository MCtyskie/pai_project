import React from 'react';
import EventCard from './EventCard';
import { Link } from "react-router-dom";

class EventListing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	}


	render() {
		let eventPage = [];
		if (this.props.events.length !== 0) {
			for (const eventItem of this.props.events) {
				eventPage.push(
					<Link key={eventItem.eventID} to={{ pathname: "/event", query: { eventItem } }}>
						<EventCard item={eventItem}></EventCard>
					</Link>
				)
			}
		}
		return (
			<div>
				{eventPage}
			</div>
		);
	}
}

export { EventListing };