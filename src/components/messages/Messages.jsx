import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import MessageItem from "./MessageItem";
import API from "../../modules/dbCalls";
import { AddMessageBox } from "./AddMessageBox";

export default class Messages extends Component {
  state = { messages: [], isAddMessageDialogVisible: false };

  paperRef = React.createRef();

  componentDidMount() {
    this.updateState();
  }

  checkLoggedInUserMessage(userId) {
    return parseInt(sessionStorage.getItem("activeUser")) === userId;
  }

  checkIfFriend(userId) {
    return this.checkLoggedInUserMessage(userId)
      ? false
      : // check if friend
        false;
  }

  updateState = () => {
    API.getAllMessages().then(messages =>
      this.setState({ messages }, this.scrollToBottom)
    );
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
        isLoggedInUsersMessage={this.checkLoggedInUserMessage(item.userId)}
        isCurrentFriend={this.checkIfFriend(item.userId)}
        delete={this.deleteMessage}
        edit={this.editMessage}
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
      </>
    );
  }
}
