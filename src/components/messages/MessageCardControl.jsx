import React, { Component } from "react";
import CardButtons from "../../modules/CardButtons";
import { PersonAdd } from "@material-ui/icons";

export class MessageCardControl extends Component {
  cardControlStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  };

  deleteMess;

  // this.props.delete()
  // this.props.edit()

  render() {
    return (
      <div style={this.cardControlStyle}>
        {this.props.isLoggedInUserMessage ? (
          <CardButtons handleEdit={null} handleDelete={null} />
        ) : null}
        {this.props.isCurrentFriend ? null : <PersonAdd />}
      </div>
    );
  }
}
