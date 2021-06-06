import React from 'react';
import "./event.css";
import { Checkbox } from '@material-ui/core';
import { withRouter } from 'react-router';


class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // console.log(this.props.item);
    }


    render() {
        return (
            <div className="event-display">
                <div className="event-title">{this.props.item.title}</div>
                <div className="row-container">
                    <div className="event-photo">{this.props.item.picture}</div>
                    <div className="event-main-info">{this.props.item.date}</div>
                    <div className="event-main-info">{this.props.item.address}</div>
                </div>
                <div className="row-container">
                    <div className="event-lower-info">Over 18?<Checkbox checked={this.props.item.ageRestriction} disabled className="checkbox"></Checkbox></div>
                    <div className="event-lower-info">Invitations: {this.props.item.invitationsAccepted}/{this.props.item.maxGuests}</div>
                    <div className="event-lower-info">{this.props.item.tags}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(EventCard);