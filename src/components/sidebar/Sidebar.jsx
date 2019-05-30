import React, { Component } from "react";

export default class Sidebar extends Component {
  loggedInUser = sessionStorage.getItem("activeUser");

  render() {
    return (
      <div>
        {this.props.friends.length > 0
          ? this.props.friends.map(friend => (
              <div key={friend.user.id}>
                <h2>{friend.user.username}</h2>
                <button
                  onClick={() => {
                    this.props.deleteFriend(this.loggedInUser, friend.user.id);
                  }}
                  // disabled={this.state.saveDisabled}
                >
                  Remove
                </button>
              </div>
            ))
          : null}
      </div>
    );
  }
}
