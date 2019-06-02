import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import { PersonAdd, Close } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";

export default class Search extends Component {
  state = {
    filteredUsers: [],
    searchResults: [],
    searchBoxContent: "",
    isSnackbarVisible: false
  };

  handleSearch = e => {
    this.setState({ searchBoxContent: e.target.value }, this.search);
  };

  showSnackbar = () => this.setState({ isSnackbarVisible: true });
  hideSnackbar = () => this.setState({ isSnackbarVisible: false });

  clearSearch = () => {
    this.setState({ filteredUsers: [] });
  };

  search = () => {
    if (this.state.searchBoxContent.length === 0) {
      this.clearSearch();
      return null;
    }
    const filteredResults = this.props.allUsers
      .filter(user =>
        user.username
          .toLowerCase()
          .includes(this.state.searchBoxContent.toLowerCase())
      )
      .filter(user => {
        // Figure out if user is already a friend or has a pending request

        if (
          typeof this.props.friends.find(friend => {
            console.log("Friend object", friend.user.id);
            console.log("typeofFriend object", typeof friend.user.id);

            console.log("user object", user.id);
            console.log("typeofuser object", typeof user.id);

            return friend.user.id === user.id;
          }) === "object"
        )
          return false;

        if (
          typeof this.props.outgoingFriendRequests.find(friend => {
            console.log("Friend object", friend.user.id);
            console.log("user object", user.id);
            return friend.user.id === user.id;
          }) === "object"
        )
          return false;

        return true;
      });
    this.setState({
      filteredUsers: filteredResults
    });
  };

  makeFriendRequest = friendName => {
    this.showSnackbar();
    this.props.sendFriendRequest(friendName).then(this.props.updateState);
  };

  render() {
    return (
      <>
        <div>
          <TextField
            id="searchFriend"
            value={this.state.searchBoxContent}
            label="Name"
            className="searchFriend"
            placeholder="search"
            onChange={this.handleSearch}
            margin="normal"
            variant="outlined"
          />
        </div>
        {this.state.filteredUsers.map(user => (
          <div
            key={user.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: ".5rem 1rem",
              alignItems: "center"
            }}>
            <p>{user.username}</p>
            <IconButton
              size="small"
              className="sendBtn"
              onClick={() => this.makeFriendRequest(user.username)}>
              <PersonAdd />
            </IconButton>
          </div>
        ))}
        <div />

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
