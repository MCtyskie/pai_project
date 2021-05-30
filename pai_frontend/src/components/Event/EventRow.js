import React from 'react';
import "./event.css";
import { withRouter } from 'react-router';


class EventRow extends React.Component {
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
            <div className="event-row-container">
                <div className="event-row-column">
                    <div className="event-row-date">{this.props.item.date}</div>
                </div>
                <div className="event-row-column">
                    <div className="event-row-row-container">
                        <div className="event-row-info">{this.props.item.title}</div>
                        <div className="event-row-info">{this.props.item.address}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EventRow);