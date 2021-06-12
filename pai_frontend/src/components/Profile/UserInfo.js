import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./profile.css";
import { CustomDialog } from '../CustomDialog';
import TextField from '@material-ui/core/TextField';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            userData: {},
            isOpen: false,
            dialogContentMenuId: 0,
            dialogContentActionsId: 0,
        }
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
        this.prepareUserPanel = this.prepareUserPanel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    componentDidMount() {
        this.fetchUserDetails();
    }


	handleDialogClose() {
		this.setState({ isOpen: false });
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

    handleEdit(){
        console.log("action");
        this.setState({ isOpen: true });
    }

    handleDelete(){

    }

    handleChangePassword(){

    }

    prepareUserPanel = () => {
        let userPanel;
        let userInformations = [];
        for (const [key, value] of Object.entries(this.state.userData)) {
            if (key === "userID" || key === "photo") {
                continue;
            }
            userInformations.push(<div className="user-info">{key}: {value}</div>)
        }
        userPanel = (
            <div className="user-container">
                <div className="user-column">
                    <div className="user-picture">
                        AVATAR HERE
                    </div>
                    <Button className="">EDIT PICTURE</Button>
                </div>
                <div className="user-column">
                    <div className="user-row-info">
                        {userInformations}
                    </div>
                    <div className="user-manage-btns">
                        <Button className="" variant="primary" onClick={this.handleEdit}>EDIT PROFILE</Button>
                        <Button className="" variant="danger" onClick={this.handleDelete}>DELETE PROFILE</Button>
                        <Button className="" variant="warning" onClick={this.handleChangePassword}>CHANGE PASSWORD</Button>
                    </div>
                </div>
            </div>
        )
        return userPanel
    }

    render() {
        return (
            <div>
                <CustomDialog
                    key={this.state.isOpen}
					isOpen={this.state.isOpen} 
					onClose={this.handleDialogClose}
					dialogTitle="TEST"
					dialogHeader="Testing header"
					dialogContent={<TextField
                        autoFocus
                        required
                        name="rating"
                        margin="dense"
                        id="rating"
                        label="Rating from 0 to 5"
                        type="number"
                        fullWidth
                    />}
					dialogActions={<Button onClick={this.handleDialogClose} color="primary">
                    Cancel
                </Button>}
				/>
                {this.state.isFetchingData ? "fetching data..." : this.prepareUserPanel()}
            </div>
        );
    }
}

export { UserInfo };