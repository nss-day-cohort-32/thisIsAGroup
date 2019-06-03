import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  Snackbar,
  IconButton
} from "@material-ui/core";
import MessageItem from "./MessageItem";
import API from "../../modules/dbCalls";
import { AddMessageBox } from "./AddMessageBox";
import { Close } from "@material-ui/icons";

export default class Messages extends Component {
  state = {
    messages: [],
    isAddMessageDialogVisible: false,
    isSnackbarVisible: false
  };

  paperRef = React.createRef();

  showSnackbar = () => this.setState({ isSnackbarVisible: true });
  hideSnackbar = () => this.setState({ isSnackbarVisible: false });

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    API.getAllMessages().then(messages =>
      this.setState({ messages }, this.scrollToBottom)
    );
  };

  sendFriendRequest = friendUsername => {
    this.props.sendFriendRequest(friendUsername).then(this.updateState);
    this.showSnackbar();
  };

  deleteMessage = messageId =>
    API.deleteMessages(messageId).then(this.updateState);

  scrollToBottom = () => {
    this.paperRef.current.scrollTop = this.paperRef.current.scrollHeight;
  };

  editMessage = (id, obj) => API.editMessages(id, obj).then(this.updateState);

  addMessage = obj => {
    API.addMessages(obj).then(this.updateState);
  };

  makeMessageItems = messages => {
    return messages.map(item => (
      <MessageItem
        key={item.id}
        sendFriendRequest={this.sendFriendRequest}
        delete={this.deleteMessage}
        edit={this.editMessage}
        isUserMessage={
          item.user.id === parseInt(sessionStorage.getItem("activeUser"))
        }
        item={item}
      />
    ));
  };

  render() {
    return (
      <>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
          style={{ margin: "1rem", width: "calc(100% - 2rem)" }}>
          <Grid item>
            <Typography variant="h3">Messages:</Typography>
          </Grid>
        </Grid>
        <Paper
          ref={this.paperRef}
          style={{
            height: "calc(100vh - 250px)",
            overflowY: "auto"
          }}>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {this.makeMessageItems(this.state.messages)}
          </div>
        </Paper>
        <Paper style={{ marginTop: "1rem" }}>
          <Grid>
            <AddMessageBox addMessage={this.addMessage} />
          </Grid>
        </Paper>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.isSnackbarVisible}
          autoHideDuration={2000}
          message={<span>Friend request sent!</span>}
          onClose={this.hideSnackbar}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.hideSnackbar}>
              <Close />
            </IconButton>
          }
        />
      </>
    );
  }
}
