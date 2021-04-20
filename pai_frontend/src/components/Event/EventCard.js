import React from 'react';
import "./event.css"


class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="event-display">
                <div className="event-title">TITLE</div>
                <div className="row-container">
                    <div className="event-photo">HERE PHOTO</div>
                    <div className="event-main-info">DATA</div>
                    <div className="event-main-info">ADRES</div>
                </div>
                <div className="row-container">
                    <div className="event-lower-info">AGE RESTRICTION</div>
                    <div className="event-lower-info">INVITES</div>
                    <div className="event-lower-info">TAGS</div>
                </div>
            </div>
        );
    }
}

export { EventCard };