import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            rating: 0,
        }
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    render() {
        // TODO show events that has not been reviewed by the user with buttons to event details to issue a new review
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
                            margin="dense"
                            id="rating"
                            label="Rating from 0 to 5"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            multiline
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
                        <Button onClick={this.handleDialogClose} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export { AddReview };