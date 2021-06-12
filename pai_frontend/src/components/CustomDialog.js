import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class CustomDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <>
                <Dialog open={this.props.isOpen} onClose={this.props.handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.props.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.dialogHeader}
                        </DialogContentText>
                        {this.props.dialogContent}
                    </DialogContent>
                    <DialogActions>
                        {this.props.dialogActions}
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export { CustomDialog };