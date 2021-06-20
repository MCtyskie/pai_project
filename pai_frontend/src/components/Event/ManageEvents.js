import React from 'react';
import axios from 'axios';
import EventRow from '../Event/EventRow';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { CustomDialog } from '../CustomDialog';

class ManageEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventList: [],
            isOpen: false,
        }
        this.fetchOrganisedEvents = this.fetchOrganisedEvents.bind(this);
        this.prepareUserOwnedEvents = this.prepareUserOwnedEvents.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    componentDidMount() {
        this.fetchOrganisedEvents();
    }

    fetchOrganisedEvents() {
        const backend_url = "http://localhost:8081/api/event/manage_events";
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

    handleDialogClose() {
        this.setState({ isOpen: false });
    }

    prepareUserOwnedEvents() {
        let eventView = [];
        if (this.state.eventList.length !== 0) {
            for (const eventWithInvitations of this.state.eventList) {
                let eventItem = eventWithInvitations["first"]
                eventView.push(
                    <div key={eventItem.eventID}>
                        <EventRow item={eventItem}></EventRow>
                        <Link to={{ pathname: "/event", query: { eventItem } }}>
                            <Button variant="primary">Check details</Button>
                        </Link>
                        <Button variant="primary" onClick={() => this.setState({ isOpen: true })}>Edit Event</Button>
                    </div>
                )
            }
        }
        else {
            eventView.push(<div>No event organised, maybe start one?</div>)
        }
        return eventView;
    }


    render() {
        return (
            <div>
                <CustomDialog
                    key={this.state.isOpen}
                    isOpen={this.state.isOpen}
                    onClose={this.handleDialogClose}
                    dialogTitle="Edit Event"
                    dialogHeader="Input new information about event you want to change"
                    dialogContent={
                        <>

                        </>
                    }
                    dialogActions={
                        <>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                            <Button onClick={this.handleDialogClose} color="primary">
                                Cancel
                            </Button>
                        </>
                    }
                />
                {this.state.isFetchingData ? "fetching data..." : this.prepareUserOwnedEvents()}
            </div>
        );
    }
}

export { ManageEvents };