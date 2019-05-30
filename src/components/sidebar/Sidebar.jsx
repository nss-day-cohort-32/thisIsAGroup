import React, { Component } from "react";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default class Sidebar extends Component {
  loggedInUser = sessionStorage.getItem("activeUser");

  render() {
    return (
      <>
        <div className="sidebar">
          {this.props.friends.length > 0
            ? this.props.friends.map(friend => (
                <div key={friend.user.id}>
                  <ListItemIcon>
                    <h2>{friend.user.username}</h2>

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
        </div>
      </>
    );
  }
}
