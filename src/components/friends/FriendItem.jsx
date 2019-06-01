import React, { Component } from "react";
import { DeleteFriendDialog } from "./DeleteFriendDialog";
import { Typography, IconButton } from "@material-ui/core";
import { DeleteForeverTwoTone } from "@material-ui/icons";

export default class FriendItem extends Component {
  state = {
    isDeleteDialogVisible: false
  };

  loggedInUser = sessionStorage.getItem("activeUser");

  hideDeleteModal = () => this.setState({ isDeleteDialogVisible: false });
  showDeleteModal = () => this.setState({ isDeleteDialogVisible: true });

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: ".5rem 1rem",
          alignItems: "center"
        }}>
        {this.state.isDeleteDialogVisible ? (
          <DeleteFriendDialog
            {...this.props}
            delete={this.props.deleteFriend}
            friend={this.props.friend.user}
            myUserId={this.loggedInUser}
            hideModal={this.hideDeleteModal}
            modalVis={this.state.isDeleteDialogVisible}
          />
        ) : null}
        <Typography variant="body2">
          {this.props.friend.user.username}
        </Typography>
        <IconButton size="small" onClick={this.showDeleteModal}>
          <DeleteForeverTwoTone />
        </IconButton>
      </div>
    );
  }
}
