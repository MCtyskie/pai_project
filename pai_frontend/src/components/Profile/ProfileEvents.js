import React from 'react';


class ProfileEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.fetchParticipatedEvents = this.fetchParticipatedEvents.bind(this);
    }

    componentDidMount() {
        console.log("User events");
    }

    fetchParticipatedEvents(){
        // TODO temp endpoint name - NOT DEFINED IN BACKEND YET!
        // const backend_url = "http://localhost:8081/api/event/participated";
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
        return (
                <div>Hello from user events</div>
        );
    }
}

export {ProfileEvents};