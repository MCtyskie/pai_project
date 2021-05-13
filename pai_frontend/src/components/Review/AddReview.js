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
        return (
                <div>Hello from add review</div>
        );
    }
}

export {AddReview};