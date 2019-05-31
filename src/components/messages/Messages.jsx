import React, { Component } from "react";
import { Grid, Paper, Fab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MessageItem from "./MessageItem";
import API from "../../modules/dbCalls";

export default class Messages extends Component {
  state = { messages: [] };

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
    API.getAllMessages().then(messages => this.setState({ messages }));
  };

  deleteMessage = messageId => {
    API.deleteMessages(messageId).then(this.updateState);
  };

  editMessage = (id, obj) => {
    API.editMessages(id, obj).then(this.updateState);
  };

  addMessage = obj => {
    API.addMessages(obj).then(this.updateState);
  };

  makeMessageItems = messages =>
    messages.map(item => (
      <MessageItem
        key={item.id}
        isLoggedInUsersMessage={this.checkLoggedInUserMessage(item.userId)}
        isCurrentFriend={this.checkIfFriend(item.userId)}
        delete={this.deleteMessage}
        edit={this.editMessage}
        item={item}
      />
    ));

  render() {
    return (
      <Paper>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justify="space-between"
          alignItems="center">
          <Grid item>
            <Typography variant="h3">Messages:</Typography>
          </Grid>
        </Grid>

        <Grid container direction="column-reverse">
          {this.makeMessageItems(this.state.messages)}
        </Grid>
      </Paper>
    );
  }
}
