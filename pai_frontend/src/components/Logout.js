import React from 'react';
import "./login.css"


class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            email: '',
            password: '',
            validated: false,
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.handleLogout();
    }


    handleLogout() {
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    render() {
        return (
            <div></div>
        );
    }
}

export { Logout };