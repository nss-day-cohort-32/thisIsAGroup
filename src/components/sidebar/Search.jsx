import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
          <div key={user.id}>
            <p>{user.username}</p>
            <Button variant="contained" color="primary" className="sendBtn">
              Send Request
            </Button>
          </div>
        ))}
        <div />
      </>
    );
  }
}
