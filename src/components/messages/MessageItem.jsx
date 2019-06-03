import React, { Component } from "react";
import { Card, CardHeader, Typography } from "@material-ui/core";
import "@material-ui/core/IconButton";
import { MessageCardControl } from "./MessageCardControl";
import { DeleteMessageDialog } from "./DeleteMessageDialog";
import { EditMessageDialog } from "./EditMessageDialog";
import API from "../../modules/dbCalls";

// import EditEventsModal from "./EditEventModal";
// import DeleteEventsModal from "./DeleteEventModal";

export default class MessageItem extends Component {
  state = {
    isDeleteDialogVisible: false,
    isEditDialogVisible: false,
    isFriend: true
  };
  style = {
    grid: {
      alignSelf: this.props.isUserMessage ? "flex-end" : "flex-start",
      maxWidth: "80%",
      minWidth: "40%"
    },
    card: {
      display: "flex",
      flexDirection: "row",
      margin: "10px",
      borderRadius: "15px"
    },
    cardHeader: {
      width: !this.props.isUserMessage && this.state.isFriend ? "80%" : "100%",
      backgroundColor: this.props.isUserMessage ? "#69F58A" : "orange"
    }
  };

  componentDidMount = () => {
    this.checkIfFriendOrPending();
  };

  hideDeleteModal = () => {
    this.setState({
      isDeleteDialogVisible: false
    });
  };
  hideEditModal = () => {
    this.setState({
      isEditDialogVisible: false
    });
  };

  checkIfFriendOrPending = async () => {
    // Set "isFriend" state variable to false to show "Add friend button"
    // else exit the function.

    if (this.props.isUserMessage) return 0;

    let senderId = this.props.item.userId;
    let result = await API.getFriendPair(
      sessionStorage.getItem("activeUser"),
      senderId
    );
    if (result.length === 0) this.setState({ isFriend: false });
  };

  sendFriendRequest = friendName => {
    // Intercept friend request button submission only to update local state.
    this.setState({ isFriend: true });
    this.props.sendFriendRequest(friendName);
  };

  handleDelete = _e => this.setState({ isDeleteDialogVisible: true });
  handleEdit = _e => this.setState({ isEditDialogVisible: true });

  timeView = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };

  render() {
    return (
      <div style={this.style.grid}>
        <Card raised={true} style={this.style.card}>
          <CardHeader
            title={
              <Typography variant="h6">{this.props.item.message}</Typography>
            }
            subheader={
              <Typography variant="caption">
                {`From: ${this.props.item.user.username}. Sent: ${new Date(
                  this.props.item.sendDate
                ).toLocaleString("en-US", this.timeView)}
                `}
              </Typography>
            }
            style={this.style.cardHeader}
          />
          <MessageCardControl
            {...this.props}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            sendFriendRequest={this.sendFriendRequest}
            isFriend={this.state.isFriend}
          />
        </Card>

        {this.state.isDeleteDialogVisible ? (
          <DeleteMessageDialog
            open={this.state.isDeleteDialogVisible}
            {...this.props}
            delete={this.props.delete}
            id={this.props.item.id}
            hideModal={this.hideDeleteModal}
          />
        ) : null}
        {this.state.isEditDialogVisible ? (
          <EditMessageDialog
            open={this.state.isEditDialogVisible}
            originalMessage={this.props.item.message}
            {...this.props}
            edit={this.props.edit}
            id={this.props.item.id}
            hideModal={this.hideEditModal}
          />
        ) : null}
      </div>
    );
  }
}
