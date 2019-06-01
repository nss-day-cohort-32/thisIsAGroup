import React, { Component } from "react";
import CardButtons from "../../modules/CardButtons";
import { PersonAdd } from "@material-ui/icons";

export class MessageCardControl extends Component {
  cardControlStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  };

  // this.props.delete()
  // this.props.edit()

  render() {
    return (
      <div style={this.cardControlStyle}>
        {this.props.isLoggedInUsersMessage ? (
          <CardButtons {...this.props} />
        ) : this.props.isCurrentFriend ? null : (
          <PersonAdd />
        )}
      </div>
    );
  }
}
