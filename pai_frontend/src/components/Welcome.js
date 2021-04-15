import React from 'react';


class WelcomeMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
	    console.log("Loaded Welcome Screen");
	}

	render() {
		return (
			<div>
                <h3>Welcome on our Party Maker site!</h3>
            </div>
		);
	}
}

export {WelcomeMenu};