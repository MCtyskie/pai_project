import React from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

class UsersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData: true,
            usersList: [],
        }
        this.getAllUsers=this.getAllUsers.bind(this);
        this.prepareUsersTable=this.prepareUsersTable.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers() {
        const backend_url = "http://localhost:8081/api/user/users";
        axios.get(backend_url, {
        	headers: {
        		"Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
        	}
        })
        	.then(response => {
                console.log(response.data);
        		this.setState({ usersList: response.data, isFetchingData: false });
        	})
        	.catch(err => {
        		console.log(err);
        		this.setState({ isFetchingData: false });
        	})
    }

    prepareUsersTable() {
        let usersTable = [];
        if (this.state.usersList.length !== 0) {
            let headers = Object.values(this.state.usersList)[0];
            let header = Object.keys(headers);
            usersTable =
                (<Table responsive>
                    <thead>
                        <tr>
                            {header.map((k, i) => <th key={i}>{k}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.usersList.map((r, i) => (
                                <tr key={i}>{
                                    Object.values(r).map((resval, j) => <td key={j}>{resval.toString()}</td>)
                                }
                                {/* TODO maybe popup instead of transition to another view? */}
                                <Button variant="primary">
                                    Edit
                                </Button>
                                {/* TODO somekind of alert & confirmation? */}
                                <Button variant="danger">
                                    
                                    Delete
                                </Button>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>)
        }
        return usersTable;
    }

    render() {
        // TODO add button to add new users -> maybe popup too?
        return (
            <div>
                {this.state.isFetchingData ? "fetching data..." : this.prepareUsersTable()}
            </div>
        );
    }
}

export { UsersView };