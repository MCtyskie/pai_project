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
        this.updateInvitationStatus = this.updateInvitationStatus.bind(this);

    }

    componentDidMount() {
        this.fetchOrganisedEvents();
    }

    updateInvitationStatus(invitation, newStatus) {
        const backend_url = "http://localhost:8081/api/invitation/update";
        let data = {
            invitationID: invitation["invitationID"],
            inviterID: invitation["inviterID"],
            inviterName: invitation["inviterName"],
            invitedID: invitation["invitedID"],
            invitedName: invitation["invitedName"],
            eventID: invitation["eventID"],
            status: newStatus,
        }
        console.log(data);
        axios.post(backend_url, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            }
        }).then(response => {
            console.log(response.data);
            this.setState({ isFetchingData: true }, () => this.fetchOrganisedEvents());
        }).catch(err => {
            console.log("something wrong happend");
            console.log(err);
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
                // We get list of pairs so first is always an event and second is list of invitations for this events
                this.setState({ eventList: response.data, isFetchingData: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false });
            })
    }

    prepareEventInvitations() {
        let eventInvitations = [];
        this.state.eventList.forEach(pair => {
            let invitationsTab = []
            if (pair["second"].length !== 0) {
                pair["second"].forEach(invitation => {
                    invitationsTab.push(
                        <div>
                            <div>
                                {invitation["invitedName"]} | status : {invitation["status"]}
                            </div>
                            <Button variant="primary" onClick={() => this.updateInvitationStatus(invitation, "ACCEPTED")}>Accept</Button>
                            <Button variant="secondary" onClick={() => this.updateInvitationStatus(invitation, "DENIED")}>Discard</Button>
                        </div>
                    )
                })
            }
            else {
                invitationsTab.push(
                    <div>
                        No invitations yet
                    </div>
                )
            }
            eventInvitations.push(
                <div>
                    <EventRow item={pair["first"]} />
                    {invitationsTab}
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