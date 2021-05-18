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
            isFetchingData: false,
            eventList: [],
        }
        this.fetchParticipatedEvents = this.fetchParticipatedEvents.bind(this);
        this.prepareEventListing = this.prepareEventListing.bind(this);
    }

    componentDidMount() {
        console.log("User events");
        this.fetchParticipatedEvents();
    }

    fetchParticipatedEvents() {
        // TODO temp endpoint name - NOT DEFINED IN BACKEND YET!
        // const backend_url = "http://localhost:8081/api/event/participated";
        // axios.get(backend_url, {
        // 	headers: {
        // 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
        // 	}
        // })
        // 	.then(response => {
        // 		this.setState({ eventList: response.data, isFetchingData: false });
        // 	})
        // 	.catch(err => {
        // 		console.log(err);
        // 		this.setState({ isFetchingData: false });
        // 	})
    }

    prepareEventListing() {
        let eventView = [];
        let dummy_data = [
            {
                "title": "meloinferno",
                "date": "2021-04-19 19:00:00",
                "address": "Bydgoszcz 85 - 435 Puławska 13",
                "ageRestriction": true,
                "invitationsAccepted": "23",
                "maxGuests": "100",
                "picture": "JPG",
                "description": "witajcie na testowym evencie melo inferno jak sie macie panowie haha",
                "isReviewed": true,
                "tags": [],
            },
            {
                "title": "meloinferno",
                "date": "2021-05-03 20:30:00",
                "address": "Bydgoszcz 85 - 435 Puławska 13",
                "ageRestriction": false,
                "invitationsAccepted": "0",
                "maxGuests": "100",
                "picture": "JPG",
                "description": "Drugi testowy event",
                "isReviewed": false,
                "tags": [],
            }
        ]
        // for (const eventItem of this.state.eventList) {
        for (const eventItem of dummy_data) {
            eventView.push(
                <div>
                    <EventRow item={eventItem}></EventRow>
                    {eventItem.isReviewed ? <Button disabled>Reviewed</Button> : <AddReview eventId={eventItem.eventId}></AddReview>}
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