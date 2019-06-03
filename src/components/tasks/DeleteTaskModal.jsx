import React, { Component } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
  Button
} from "@material-ui/core";

export class DeleteTaskModal extends Component {
  handleDel = () => {
    this.props.delete(this.props.taskId);
    this.props.hideModal();
  };

  render() {
    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.modalVis}
        onClose={this.props.hideModal}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleted tasks cannot be recovered
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

export default DeleteTaskModal;
