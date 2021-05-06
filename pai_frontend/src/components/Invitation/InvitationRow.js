import React from "react";

class InvitationRow extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}

    componentDidMount(){
        console.log("loaded Invitation row");
    }

    render(){
        // TODO implement small rows for profile incoming / past events
        return(
            <div>
                
            </div>
        );
    }
}

export {InvitationRow};