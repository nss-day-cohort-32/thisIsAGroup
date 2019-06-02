import React, { Component } from "react";
import Search from "./Search";
import API from "../../modules/dbCalls";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import FriendItem from "../friends/FriendItem";

export default class Sidebar extends Component {
  loggedInUser = sessionStorage.getItem("activeUser");

  state = {
    allUsers: []
  };

  updateState = () => {
    API.getAllUsers().then(allUsers => this.setState({ allUsers }));
  };

  componentDidMount() {
    this.updateState();
    this.props.getFriends();
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
                        onClick={() => {
                          this.props.deleteFriend(
                            this.loggedInUser,
                            friend.user.id
                          );
                        }}>
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
      </>
    );
  }
}
