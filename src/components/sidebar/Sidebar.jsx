import React, { Component } from "react";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Search from "./Search";
import API from "../../modules/dbCalls";
import Button from "@material-ui/core/Button";

export default class Sidebar extends Component {
  loggedInUser = sessionStorage.getItem("activeUser");

  state = {
    allUsers: []
  };

  componentDidMount() {
    const newState = {};

    API.getAllUsers()
      .then(allUsers => (newState.allUsers = allUsers))
      .then(() => this.setState(newState));
  }

  render() {
    return (
      <>
        <div className="sidebar">
          <h1>Friends</h1>
          <hr />
          {this.props.friends.length > 0
            ? this.props.friends.map(friend => (
                <div key={friend.user.id}>
                  <h2>{friend.user.username}</h2>
                  <ListItemIcon>
                    <DeleteForeverTwoToneIcon
                      onClick={() => {
                        this.props.deleteFriend(
                          this.loggedInUser,
                          friend.user.id
                        );
                      }}
                    />
                  </ListItemIcon>
                </div>
              ))
            : null}
          <div>
            <div>
              <h1>Friend Request</h1>
              <hr />
              {this.props.friendRequests.length > 0
                ? this.props.friendRequests.map(friend => (
                    <div key={friend.user.id}>
                      <h2>{friend.user.username}</h2>
                      <Button
                        variant="contained"
                        color="primary"
                        className="acceptBtn"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className="denyBtn"
                        onClick={() => {
                          this.props.deleteFriend(
                            this.loggedInUser,
                            friend.user.id
                          );
                        }}
                      >
                        Deny
                      </Button>
                    </div>
                  ))
                : null}
            </div>
            <Search
              friends={this.props.friends}
              allUsers={this.state.allUsers}
            />
          </div>
        </div>
      </>
    );
  }
}
