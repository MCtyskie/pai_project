import React from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

class EventsToReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            eventsList: [],
        }
        this.getEventsToReview=this.getEventsToReview.bind(this);
        this.prepareEventsToReview=this.prepareEventsToReview.bind(this);
    }

    componentDidMount() {
        this.getEventsToReview();
    }

    getEventsToReview() {
        const backend_url = "http://localhost:8081/api/event/toReview";
        axios.get(backend_url, {
        	headers: {
        		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
        	}
        })
        	.then(response => {
                console.log(response.data);
        		this.setState({ eventsList: response.data, isFetchingData: false });
        	})
        	.catch(err => {
        		console.log(err);
        		this.setState({ isFetchingData: false });
        	})
    }

    prepareEventsToReview() {
        let eventsToReview = [];
        
        return eventsToReview;
    }

    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareEventsToReview()}
            </div>
        );
    }
}

export { EventsToReview };