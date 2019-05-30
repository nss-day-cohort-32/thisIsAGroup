import React, { Component } from 'react';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Button } from '@material-ui/core';

export default class EditNewsModal extends Component {
    render() {
        return (
            <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.modalVis}
            onClose={this.props.hideModal}
        >

            <DialogTitle>Are you sure you want to delete this news article?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deleted articles cannot be recovered
                    </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={this.handleDel}>YES</Button>
                <Button className="" variant="contained" onClick={this.props.hideModal}>NO</Button>
            </DialogActions>

        </Dialog >
        )
    }
}
