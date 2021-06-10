import React from "react";
import axios from 'axios';
import { InvitationRow } from "./InvitationRow";

class InvitationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            invitationsList: [],
        }
        this.getUserInvitations = this.getUserInvitations.bind(this);
        this.prepareInvitations = this.prepareInvitations.bind(this);
    }

    componentDidMount() {
        this.getUserInvitations();
    }

    getUserInvitations() {
        const backend_url = "http://localhost:8081/api/invitation/invPerInvited";
        axios.get(backend_url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            }
        })
            .then(response => {
                this.setState({ invitationsList: response.data, isFetchingData: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false });
            })
    }

    prepareInvitations() {
        let invitations = [];
        this.state.invitationsList.forEach(invite => {
            invitations.push(<InvitationRow invitation={invite}/>)
        });
        return invitations;
    }

    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareInvitations()}
            </div>
        );
    }
}

export { InvitationView };