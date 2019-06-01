import React, { Component } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
  Button
} from "@material-ui/core";
import unfriend from "./unfriend.jpg";

export class DeleteFriendDialog extends Component {
  handleDel = () => {
    this.props.deleteFriend(this.props.id, this.props.user);
    this.props.hideModal();
  };

  render() {
    return (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.modalVis}
        fullWidth={true}
        maxWidth="sm"
        onClose={this.props.hideModal}>
        <DialogTitle>Are you sure you want to delete this person?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What did (insert pronoun here) do to you??
          </DialogContentText>
          <div
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
            <img src={unfriend} style={{ width: "100%" }} />
          </div>
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
