import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";

export class AddMessageBox extends Component {
  state = {
    message: null
  };

  handleChange = e => {
    let message = e.target.value;
    this.setState({ message });
  };

  style = {
    div: {
      width: "80%",
      display: "flex",
      flexDirection: "row"
    },
    textField: {},
    button: {
      minWidth: "20%"
    },
    buttonContainer: {
      maxWidth: "20%"
    }
  };

  sendMessage = () => {
    this.props.addMessage({
      userId: parseInt(sessionStorage.getItem("activeUser")),
      message: this.state.message,
      sendDate: new Date()
    });
  };

  render() {
    return (
      <div style={this.style.div}>
        <TextField
          id="message"
          label="New Message"
          style={{ margin: 8 }}
          placeholder=""
          fullWidth
          margin="normal"
          onChange={this.handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <div style={this.style.buttonContainer} />
        <Button variant="outlined" fullWidth={true} onClick={this.sendMessage}>
          Send it.
        </Button>
      </div>
    );
  }
}
