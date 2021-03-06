import React from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            rating: 0,
            comment: "",
            isResponseError: false,
            isFetchingData: true,
            isFetchingError: false,
            canAddReview: false,
            reviewSent: false,
        }
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDialogAdd = this.handleDialogAdd.bind(this);
        this.fetchIfUserCanAddReview = this.fetchIfUserCanAddReview.bind(this);
        this.prepareReviewDialog = this.prepareReviewDialog.bind(this);
    }

    componentDidMount() {
        this.fetchIfUserCanAddReview();
    }

    fetchIfUserCanAddReview() {
        const backend_url = "http://localhost:8081/api/review/review_check";
        axios.get(backend_url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
            },
            params: {
                eventID: this.props.eventID,
            }
        })
            .then(response => {
                console.log(response.data);
                this.setState({
                    canAddReview: response.data,
                    isFetchingData: false,
                    isFetchingError: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isFetchingData: false, isFetchingError: true });
            })
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
            const backend_url = "http://localhost:8081/api/review/add";
            axios.post(backend_url, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token').substring(1).slice(0, -1)}`,
                }
            })
                .then(response => {
                    console.log(response.status);
                    response.status === 201 ? this.setState({ canAddReview: false, reviewSent: true, isResponseError: false }) :
                        this.setState({ isResponseError: true });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ isResponseError: true });
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

    prepareReviewDialog() {
        return (
            <>
                <Button variant="primary" onClick={this.handleDialogOpen} disabled={!this.state.canAddReview}>Add Review</Button>
                {this.state.reviewSent ? <Alert variant="success">Added comment, Thank you!</Alert> : <div></div>}
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

    render() {
        if (this.state.isResponseError) {
            return <Alert variant="warning">
                <Alert.Heading>
                    Couldn't load data
				</Alert.Heading>
				Something happend during data transfer...<br />
                <Alert.Link href="/#">Go back to menu</Alert.Link>
            </Alert>
        }
        return (
            <>
                {this.state.isFetchingData ? <></> : this.prepareReviewDialog()}
            </>
        );
    }
}

export { AddReview };