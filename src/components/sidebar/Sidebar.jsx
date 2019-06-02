import React, { Component } from "react";
import Search from "./Search";
import API from "../../modules/dbCalls";
import Button from "@material-ui/core/Button";
import { Typography, Snackbar, IconButton } from "@material-ui/core";
import FriendItem from "../friends/FriendItem";
import { Close } from "@material-ui/icons";

export default class Sidebar extends Component {
  state = {
    allUsers: [],
    isSnackbarVisible: false
  };

  updateState = () => {
    API.getAllUsersExcluding(sessionStorage.getItem("activeUser")).then(
      allUsers => this.setState({ allUsers })
    );
  };

  hideSnackbar = () => this.setState({ isSnackbarVisible: false });
  showSnackbar = () => this.setState({ isSnackbarVisible: true });

  componentDidMount() {
    this.updateState();
    this.props.getFriends();
  }

  rejectFriendRequest(friendId) {
    this.props.deleteFriend(sessionStorage.getItem("activeUser"), friendId);
    this.showSnackbar();
  }

  render() {
    return (
      <>
        <div className="sidebar" style={{ position: "fixed", height: "100%" }}>
          <Typography variant="h6" style={{ marginLeft: ".4rem" }}>
            Friends
          </Typography>
          <hr />
          {this.props.friends.length > 0
            ? this.props.friends.map(friend => (
                <FriendItem
                  friend={friend}
                  key={friend.user.id}
                  deleteFriend={this.props.deleteFriend}
                />
              ))
            : null}
          <div>
            <div>
              <Typography variant="h6" style={{ marginLeft: ".4rem" }}>
                Friend Request
              </Typography>
              <hr />
              {this.props.friendRequests.length > 0
                ? this.props.friendRequests.map(friend => (
                    <div key={friend.user.id}>
                      <h2>{friend.user.username}</h2>
                      <Button
                        onClick={() =>
                          this.props
                            .acceptFriendRequest(friend.user.id)
                            .then(this.updateState)
                        }
                        variant="contained"
                        color="primary"
                        className="acceptBtn">
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="denyBtn"
                        onClick={() =>
                          this.rejectFriendRequest(friend.user.id)
                        }>
                        Deny
                      </Button>
                    </div>
                  ))
                : null}
            </div>
            <Search
              friends={this.props.friends}
              outgoingFriendRequests={this.props.outgoingFriendRequests}
              allUsers={this.state.allUsers}
              updateState={this.updateState}
              sendFriendRequest={this.props.sendFriendRequest}
            />
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.isSnackbarVisible}
          autoHideDuration={2000}
          message={<span>Rejected!!</span>}
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
