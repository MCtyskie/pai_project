import React from 'react';


class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("redirect to event details view on selection for adding review");
    }


    render() {
        // TODO show events that has not been reviewed by the user with buttons to event details to issue a new review
        return (
                <div>Hello from add review</div>
        );
    }
}

export {AddReview};