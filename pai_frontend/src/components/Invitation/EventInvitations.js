import React from 'react';
import axios from 'axios';
import EventRow from '../Event/EventRow';
import Button from 'react-bootstrap/Button';



class EventInvitations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventList: [],
        }
        this.fetchOrganisedEvents = this.fetchOrganisedEvents.bind(this);
        this.prepareEventInvitations = this.prepareEventInvitations.bind(this);
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
                // We get list of pairs so first is always an event and second is list of invitations for this events
                this.setState({ eventList: response.data, isFetchingData: false  });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false });
            })
    }

    prepareEventInvitations() {
        let eventInvitations = [];
        this.state.eventList.forEach(pair =>{
            console.log(pair["first"]);
            console.log(pair["second"]);
            eventInvitations.push(
                <div>
                    <EventRow item={pair["first"]}/>
                    <div>{pair["second"]["status"]} | {pair["second"]["invitedName"]}</div>
                    <Button variant="primary">Accept</Button>
                    <Button variant="secondary">Discard</Button>
                </div>
            )
        })
        return eventInvitations;
    }


    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareEventInvitations()}
            </div>
        );
    }
}

export { EventInvitations };