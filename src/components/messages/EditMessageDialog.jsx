import React, { Component } from "react";
import {
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Button,
  TextField
} from "@material-ui/core";

export class EditMessageDialog extends Component {
  state = {
    message: null
  };

  componentDidMount() {
    let message = this.props.originalMessage;
    this.setState({ message });
  }

  editMessage = () => {
    let message = this.state.message;

    let eventsID = this.props.id;

    this.props.edit(eventsID, { message });
    this.props.hideModal();
  };

  handleChange = e => {
    let message = e.target.value;
    this.setState({ message });
  };

  style = {
    paper: {
      width: "50%"
    }
  };

  render() {
    return (
      <Dialog
        maxWidth="lg"
        fullWidth
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.hideModal}
        classes={this.style}>
        <DialogTitle>Edit Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="message"
            label="Message"
            type="text"
            variant="outlined"
            defaultValue={this.props.originalMessage}
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.editMessage}>
            SUBMIT
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.props.hideModal}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
