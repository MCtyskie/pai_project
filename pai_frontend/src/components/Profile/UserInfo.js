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
            name: '',
            lastName: '',
            email: '',
            birthdate: '',
            city: '',
            phone: '',
            old_password: '',
            new_password: '',
        }
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
        this.prepareUserPanel = this.prepareUserPanel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.dialogContentChooser = this.dialogContentChooser.bind(this);
        this.prepareEditDialogContent = this.prepareEditDialogContent.bind(this);
        this.prepareDeleteDialogContent = this.prepareDeleteDialogContent.bind(this);
        this.prepareChangePasswordDialogContent = this.prepareChangePasswordDialogContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dialogTitleChooser = this.dialogTitleChooser.bind(this);
        this.dialogHeaderChooser = this.dialogHeaderChooser.bind(this);
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

    dialogContentChooser(menuId) {
        if (menuId == 1) {
            return this.prepareEditDialogContent()
        }
        else if (menuId == 2) {
            return this.prepareDeleteDialogContent()
        }
        else if (menuId == 3) {
            return this.prepareChangePasswordDialogContent()
        }
    }

    dialogTitleChooser(menuId) {
        if (menuId == 1) {
            return "Edit profile information"
        }
        else if (menuId == 2) {
            return "Account deletion"
        }
        else if (menuId == 3) {
            return "Password change"
        }
    }

    dialogHeaderChooser(menuId) {
        if (menuId == 1) {
            return "Input new profile data"
        }
        else if (menuId == 2) {
            return "Please confirm"
        }
        else if (menuId == 3) {
            return "You're about to set a new password"
        }
    }


    prepareEditDialogContent = () => {
        return (
            <>
                <TextField
                    autoFocus
                    name="name"
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="lastName"
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="email"
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="birthdate"
                    margin="dense"
                    id="birthdate"
                    label="Birthdate"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="city"
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="phone"
                    margin="dense"
                    id="phone"
                    label="Phone number"
                    type="text"
                    fullWidth
                />
            </>
        )
    }

    prepareDeleteDialogContent = () => {
        return (
            <>
                Please confirm if You are sure. You're now about to delete your account forever!
            </>
        )
    }

    prepareChangePasswordDialogContent = () => {
        return (
            <>
                <TextField
                    autoFocus
                    required
                    name="old_password"
                    margin="dense"
                    id="old_password"
                    label="Old Password"
                    type="password"
                    fullWidth
                />
                <TextField
                    autoFocus
                    required
                    name="new_password"
                    margin="dense"
                    id="new_password"
                    label="Input new password"
                    type="password"
                    fullWidth
                />
            </>
        )
    }

    handleEdit() {
        this.setState({ isOpen: true, dialogContentMenuId: 1 });
    }

    handleDelete() {
        this.setState({ isOpen: true, dialogContentMenuId: 2 });
    }

    handleChangePassword() {
        this.setState({ isOpen: true, dialogContentMenuId: 3 });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        let config;
        if (this.state.dialogContentMenuId == 1) {
            config = {
                method: "put",
                url: "http://localhost:8081/api/user/edit",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                },
                data: {
                    name: this.state.name,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    birthdate: this.state.birthdate,
                    city: this.state.city,
                    phone: this.state.phone,
                }
            };
        }
        else if (this.state.dialogContentMenuId == 2) {
            config = {
                method: "delete",
                url: "http://localhost:8081/api/user/delete/" + this.state.userData.userID,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                },
            };
        }
        else if (this.state.dialogContentMenuId == 3) {
            // TODO endpoint backend
            config = {
                method: "put",
                url: "http://localhost:8081/api/user/change_password",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                },
                data: {
                    password: this.state.new_password
                }
            };
        }
        axios(config)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            })
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
                    dialogTitle={this.dialogTitleChooser(this.state.dialogContentMenuId)}
                    dialogHeader={this.dialogHeaderChooser(this.state.dialogContentMenuId)}
                    dialogContent={this.dialogContentChooser(this.state.dialogContentMenuId)}
                    dialogActions={
                        <>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                            <Button onClick={this.handleDialogClose} color="primary">
                                Cancel
                            </Button>
                        </>
                    }
                />
                {this.state.isFetchingData ? "fetching data..." : this.prepareUserPanel()}
            </div>
        );
    }
}

export { UserInfo };