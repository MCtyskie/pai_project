import React from 'react';


class ProfileEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("User events");
    }


    render() {
        return (
                <div>Hello from user events</div>
        );
    }
}

export {ProfileEvents};