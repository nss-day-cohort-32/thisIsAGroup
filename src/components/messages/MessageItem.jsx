import React, { Component } from "react";
import { Edit, Delete, Link } from "@material-ui/icons";
import {
  Card,
  IconButton,
  Grid,
  CardMedia,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";
import "@material-ui/core/IconButton";
import { MessageCardControl } from "./MessageCardControl";

// import EditEventsModal from "./EditEventModal";
// import DeleteEventsModal from "./DeleteEventModal";

export default class MessageItem extends Component {
  gridStyle = {
    alignSelf: this.props.isLoggedInUsersMessage ? "flex-end" : "flex-start",
    maxWidth: "80%",
    minWidth: "30%"
  };

  cardStyle = {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    borderRadius: "15px"
  };

  cardHeaderStyle = {
    width: "80%",
    backgroundColor: "orange"
  };

  hideEditModal = () => {
    this.setState({
      editModalVis: false
    });
  };

  hideDeleteModal = () => {
    this.setState({
      deleteModalVis: false
    });
  };

  handleEdit = _e => {
    this.setState({ editModalVis: true });
  };

  handleDelete = _e => {
    this.setState({ deleteModalVis: true });
  };

  headerProps = {
    title: this.props.item.message,
    subheader: this.props.item.sendDate,
    style: this.cardHeaderStyle
  };

  render() {
    return (
      <Grid item style={this.gridStyle}>
        <Card raised={true} style={this.cardStyle}>
          <CardHeader {...this.headerProps} />
          <MessageCardControl {...this.props} />
        </Card>
      </Grid>
    );
  }
}
