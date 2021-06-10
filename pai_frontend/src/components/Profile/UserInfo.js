import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./profile.css";


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            userData: {},
        }
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
        this.prepareUserPanel = this.prepareUserPanel.bind(this);
    }

    componentDidMount() {
        this.fetchUserDetails();
    }

    fetchUserDetails() {
        this.setState({ isFetchingData: true });
        const backend_url = "http://localhost:8081/api/user/profile";
        axios.get(backend_url, {
        	headers: {
        		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
        	}
        })
        	.then(response => {
                console.log(response.data)
        		this.setState({ userData: response.data, isFetchingData: false });
        	})
        	.catch(err => {
        		console.log(err);
        		this.setState({ isFetchingData: false });
        	})

    }

    prepareUserPanel = () => {
        let userPanel;
        let dummy_data = {
            "userID": 1,
            "name": "Jan",
            "lastName": "Kowalsky",
            "email": "jkowal@test.com",
            "city": "TestCity",
            "phone": "987987987",
            "birthdate": "2000-01-01",
            "photo": "JPG",
        }
        let userInformations = [];
        for (const [key, value] of Object.entries(dummy_data)) {
            if (key === "userID" || key === "photo") {
                continue;
            }
            userInformations.push(<div className="user-info">{value}</div>)
        }
        userPanel = (
            <div className="user-container">
                <div className="user-column">
                    <div className="user-picture">
                        {dummy_data.photo}
                    </div>
                    <Button className="">EDIT PICTURE</Button>
                </div>
                <div className="user-column">
                    <div className="user-row-info">
                        {userInformations}
                    </div>
                    <div className="user-manage-btns">
                        <Button className="" variant="primary">EDIT PROFILE</Button>
                        <Button className="" variant="danger">DELETE PROFILE</Button>
                        <Button className="" variant="warning">CHANGE PASSWORD</Button>
                    </div>
                </div>
            </div>
        )
        return userPanel
    }

    render() {
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareUserPanel()}
            </div>
        );
    }
}

export { UserInfo };