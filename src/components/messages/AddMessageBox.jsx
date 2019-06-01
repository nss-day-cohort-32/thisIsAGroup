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
      display: "flex",
      flexDirection: "row"
    },
    textDiv: { width: "80%", padding: "0 1rem" },
    buttonContainer: {
      width: "20%"
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
        <div style={this.style.textDiv}>
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
        </div>

        <div style={this.style.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            style={{
              height: "calc(100% - 16px)",
              width: "calc(100% - 16px)",
              margin: "8px",
              boxSizing: "border-box"
            }}
            fullWidth={true}
            onClick={this.sendMessage}>
            Send it.
          </Button>
        </div>
      </div>
    );
  }
}
