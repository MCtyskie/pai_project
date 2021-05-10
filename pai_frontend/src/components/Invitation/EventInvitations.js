import React from 'react';


class EventInvitations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("Event invitations");
    }


    render() {
        return (
                <div>Hello from event invitations</div>
        );
    }
}

export {EventInvitations};