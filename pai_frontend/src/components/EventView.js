import React from 'react';


class EventView extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            eventList: [],
		}
	}

	componentDidMount() {
	    console.log("Loaded Event views");
	}

    fetchAllEvents() {
        console.log("TODO fetch events");
    }

	render() {
		return (
			<div>

            </div>
		);
	}
}

export {EventView};