import React from 'react';
import axios from 'axios';
import EventRow from '../Event/EventRow';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class ManageEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: false,
            eventList: [],
        }
        this.fetchOrganisedEvents = this.fetchOrganisedEvents.bind(this);
        this.prepareUserOwnedEvents = this.prepareUserOwnedEvents.bind(this);
    }

    componentDidMount() {
        this.fetchOrganisedEvents();
    }

    fetchOrganisedEvents() {
        const backend_url = "http://localhost:8081/api/event/manageEvents";
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

    prepareUserOwnedEvents() {
        let eventView = [];
        if(this.state.eventList.length > 0 ){
            for (const eventItem of this.state.eventList) {
                eventView.push(
                    <div>
                        <EventRow item={eventItem}></EventRow>
                        <Link to={{ pathname: "/event", query: { eventItem } }}>
                            <Button variant="primary">Check details</Button>
                        </Link>
                        <Link to={{ pathname: "/", query: { eventItem } }}>
                            <Button variant="primary">Edit Event</Button>
                        </Link>
                    </div>
                )
            }
        }
        else{
            eventView.push(<div>No event organised, maybe start one?</div>)
        }
        return eventView;
    }


    render() {
        // TODO view design? Should be the same as view event or what?
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareUserOwnedEvents()}
            </div>
        );
    }
}

export { ManageEvents };