import React from 'react';
import EventRow from '../Event/EventRow';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { AddReview } from '../Review/AddReview';
import axios from 'axios';


class ProfileEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventList: [],
        }
        this.fetchParticipatedEvents = this.fetchParticipatedEvents.bind(this);
        this.prepareEventListing = this.prepareEventListing.bind(this);
    }

    componentDidMount() {
        this.fetchParticipatedEvents();
    }

    fetchParticipatedEvents() {
        const backend_url = "http://localhost:8081/api/event/finished_events";
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

    prepareEventListing() {
        let eventView = [];
        if(this.state.eventList.length === 0){
            return <div>No events that you participated, maybe join one?</div>
        }
        for (const eventWithReviewFlag of this.state.eventList) {
            let eventItem = eventWithReviewFlag.first
            eventView.push(
                <div>
                    <EventRow item={eventItem}></EventRow>
                    {eventWithReviewFlag.second ? <AddReview eventID={eventItem.eventID}></AddReview> : <Button disabled>Reviewed</Button>}
                    <Link to={{ pathname: "/event", query: { eventItem } }}>
                        <Button variant="primary">Check details</Button>
                    </Link>
                </div>
            )
        }
        return eventView;
    }


    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareEventListing()}
            </div>
        );
    }
}

export { ProfileEvents };