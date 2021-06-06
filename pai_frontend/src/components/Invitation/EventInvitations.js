import React from 'react';
import axios from 'axios';



class EventInvitations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventList: [],
        }
        this.fetchOrganisedEvents = this.fetchOrganisedEvents.bind(this);
        this.prepareEventInvitations = this.prepareEventInvitations.bind(this);
        this.fetchInvitationsPerEvent = this.fetchInvitationsPerEvent.bind(this);
    }

    componentDidMount() {
        this.fetchOrganisedEvents();
    }

    fetchInvitationsPerEvent(eventID){
        const backend_url = "http://localhost:8081/api/invitation/invPerEvent";
        axios.get(backend_url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            },
			params: {
				eventID: eventID,
			}
        })
            .then(response => {
                let invitations = response.data[0];
                return invitations;
            })
            .catch(err => {
                console.log(err);
                return [];
            })
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

    prepareEventInvitations() {
        let eventInvitations = [];
        let invitationsPerEvent = {};
        this.state.eventList.forEach(eventItem =>{
            invitationsPerEvent[eventItem.eventID] = this.fetchInvitationsPerEvent(eventItem.eventID);
        });
        console.log(invitationsPerEvent);
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