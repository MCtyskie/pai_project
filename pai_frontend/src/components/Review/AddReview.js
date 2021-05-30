import React from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            rating: 0,
            comment: "",
        }
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogAdd = this.handleDialogAdd.bind(this);
    }

    componentDidMount() {
        console.log("redirect to event details view on selection for adding review");
    }

    handleDialogOpen() {
        this.setState({ isOpen: true });
    }

    handleDialogClose() {
        this.setState({ isOpen: false });
    }

    handleDialogAdd() {
        this.setState({ isOpen: false }, () => {
            let data = {
                eventID: this.props.eventID,
                rate: this.state.rating,
                description: this.state.comment,
            }
            console.log(data);
            const backend_url = "http://localhost:8081/review/addReview";
            axios.post(backend_url, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                }
            })
                .then(response => {
                    console.log(response.status);
                })
                .catch(err => {
                    console.log(err);
                })
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "rating" && value < 0 || value > 5) {
            console.log("todo create alert, rating too big");
        }
        else {
            this.setState({
                [name]: value
            });
        }
    }


    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleDialogOpen}>Add Review</Button>
                <Dialog open={this.state.isOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Review</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please input scale and comment
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            name="rating"
                            onChange={this.handleChange}
                            margin="dense"
                            id="rating"
                            label="Rating from 0 to 5"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            multiline
                            name="comment"
                            onChange={this.handleChange}
                            rowsMax={4}
                            id="comment"
                            label="Comment"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDialogAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export { AddReview };