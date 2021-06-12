import React from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import EventRow from "../Event/EventRow";
import { AddReview } from "./AddReview";
import { Link } from "react-router-dom";

class EventsToReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventsList: [],
        }
        this.getEventsToReview = this.getEventsToReview.bind(this);
        this.prepareEventsToReview = this.prepareEventsToReview.bind(this);
    }

    componentDidMount() {
        this.getEventsToReview();
    }

    getEventsToReview() {
        const backend_url = "http://localhost:8081/api/event/events_to_review";
        axios.get(backend_url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({ eventsList: response.data, isFetchingData: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false });
            })
    }

    prepareEventsToReview() {
        let eventsToReview = [];
        if (this.state.eventsList.length === 0) {
            return <div>No events to review</div>
        }
        else {
            this.state.eventsList.forEach(eventItem => {
                eventsToReview.push(
                    <div>
                        <EventRow item={eventItem} />
                        <Link to={{ pathname: "/event", query: { eventItem } }}>
                            <Button variant="primary">Go to event details</Button>
                        </Link>
                        <AddReview eventID={eventItem.eventID}></AddReview>
                    </div>

                )
            })
        }
        return eventsToReview;
    }

    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareEventsToReview()}
            </div>
        );
    }
}

export { EventsToReview };