import React from 'react';


class ManageEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
        }
        this.fetchOrganisedEvents = this.fetchOrganisedEvents.bind(this);
    }

    componentDidMount() {
        console.log("Manage events");
    }

    fetchOrganisedEvents(){
        // TODO temp endpoint name - NOT DEFINED IN BACKEND YET!
        // const backend_url = "http://localhost:8081/api/event/manage";
		// axios.get(backend_url, {
		// 	headers: {
		// 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
		// 	}
		// })
		// 	.then(response => {
		// 		this.setState({ eventList: response.data});
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	})
    }


    render() {
        // TODO view design? Should be the same as view event or what?
        return (
                <div>Hello from manage events</div>
        );
    }
}

export {ManageEvents};