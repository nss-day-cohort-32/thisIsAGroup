import React, { Component } from "react";
import CardButtons from "../../modules/CardButtons";
import { PersonAdd } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export class MessageCardControl extends Component {
  cardControlStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "20%",
    backgroundColor: this.props.isUserMessage ? "#69F58A" : "orange"
  };

  handleAddFriend = () => {
    console.log(this.props.item.user.username);
    this.props.sendFriendRequest(this.props.item.user.username);
  };

  render() {
    return (
      <div style={this.cardControlStyle}>
        {this.props.isUserMessage && <CardButtons {...this.props} />}
        {!this.props.isFriend && (
          <IconButton onClick={this.handleAddFriend}>
            <PersonAdd />
          </IconButton>
        )}
      </div>
    );
  }
}
