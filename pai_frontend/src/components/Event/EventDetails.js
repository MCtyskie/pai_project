import React from 'react';


class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		console.log(this.props.location.query.eventItem);
	}

	render() {
		return (
			<div>
                welcome
            </div>
        );
	}
}

export { EventDetails };