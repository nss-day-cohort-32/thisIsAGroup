import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";

export default class Search extends Component {
  state = {
    filteredUsers: [],
    searchResults: []
  };

  handleSearch = e => {
    this.search(e.target.value);
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
            <IconButton size="small" className="sendBtn">
              <PersonAdd />
            </IconButton>
          </div>
        ))}
        <div />
      </>
    );
  }
}
