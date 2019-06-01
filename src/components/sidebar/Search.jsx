import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IconButton, SnackbarContent } from "@material-ui/core";
import { PersonAdd, Close } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";

export default class Search extends Component {
  state = {
    filteredUsers: [],
    searchResults: [],
    isSnackbarVisible: false
  };

  handleSearch = e => {
    e.target.value.length > 0
      ? this.search(e.target.value)
      : this.clearSearch();
  };

  showSnackbar = () => this.setState({ isSnackbarVisible: true });
  hideSnackbar = () => this.setState({ isSnackbarVisible: false });

  clearSearch = () => {
    this.setState({ filteredUsers: [] });
  };

  search = searchTerm => {
    const filteredResults = this.props.allUsers
      .filter(user => user.username.includes(searchTerm))
      .filter(user => {
        return !this.props.friends.find(
          friend => friend.user.username === user.username
        );
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
