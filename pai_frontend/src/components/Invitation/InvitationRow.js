import React from "react";

class InvitationRow extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}

    componentDidMount(){
        console.log(this.props.invitation)
    }

    render(){
        return(
            <div>
                event : {this.props.invitation.eventID} | status :{this.props.invitation.status}
            </div>
        );
    }
}

export {InvitationRow};