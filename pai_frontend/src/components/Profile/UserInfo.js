import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./profile.css";


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: false,
            userData: {},
        }
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
        this.prepareUserPanel = this.prepareUserPanel.bind(this);
    }

    componentDidMount() {
        console.log("Loaded My Profile");
        this.fetchUserDetails();
    }

    fetchUserDetails() {
        // this.setState({ isFetchingData: true });
        // const backend_url = "http://localhost:8081/user/profile";
        // axios.get(backend_url, {
        // 	headers: {
        // 		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
        // 	}
        // })
        // 	.then(response => {
        // 		this.setState({ userData: response.data, isFetchingData: false });
        // 	})
        // 	.catch(err => {
        // 		console.log(err);
        // 		this.setState({ isFetchingData: false });
        // 	})

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
            "photo": "JPG",
        }
        userPanel = (
            <div className="user-info">
                <div className="column-container">
                    <div className="tst">{dummy_data.photo}</div>
                    {/* Not sure if link or maybe on this page or dialog openup? */}
                    <Link to="/edit_profile">
                        <Button>
                            Edit Profile
                        </Button>
                    </Link>
                </div>
                <div className="column-container">
                    <div className="tst">{dummy_data.name}</div>
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