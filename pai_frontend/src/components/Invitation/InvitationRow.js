import React from "react";

class InvitationRow extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}

    componentDidMount(){
        console.log("loaded Invitation row");
        let dummy_invitation = {
            
        };
    }

    render(){
        // TODO prepare invitation row view for invitation view per event (?)
        return(
            <div>
                
            </div>
        );
    }
}

export {InvitationRow};