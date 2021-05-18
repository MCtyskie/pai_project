import React from "react";
import EventRow from "../Event/EventRow";

class ReviewItem extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}

    componentDidMount(){
        console.log(this.props.review)
    }

    render(){
        // TODO styles and improve looks, temp version under
        return(
            <>
                <EventRow item={this.props.review.event}></EventRow>
                <div className="">
                    {this.props.review.rate}
                </div>
                <div className="">
                    {this.props.review.description}
                </div>
            </>
        );
    }
}

export {ReviewItem};