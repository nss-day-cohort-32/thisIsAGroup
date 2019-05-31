import React, { Component } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
  Button
} from "@material-ui/core";

export class DeleteMessageDialog extends Component {
  handleDel = () => {
    this.props.delete(this.props.id);
  };

  render() {
    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.hideModal}>
        <DialogTitle>Are you sure you want to delete this message?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleted messages cannot be recovered...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "darkred", color: "white" }}
            variant="contained"
            onClick={this.handleDel}>
            YES
          </Button>
          <Button
            className=""
            variant="contained"
            onClick={this.props.hideModal}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
