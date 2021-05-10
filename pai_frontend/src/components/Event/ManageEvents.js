import React from 'react';
import "./event.css";


class ManageEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("Manage events");
    }


    render() {
        return (
                <div>Hello from manage events</div>
        );
    }
}

export {ManageEvents};