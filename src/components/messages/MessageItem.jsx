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
import { DeleteMessageDialog } from "./DeleteMessageDialog";
import { EditMessageDialog } from "./EditMessageDialog";

// import EditEventsModal from "./EditEventModal";
// import DeleteEventsModal from "./DeleteEventModal";

export default class MessageItem extends Component {
  state = {
    isDeleteDialogVisible: false,
    isEditDialogVisible: false
  };
  style = {
    grid: {
      alignSelf: this.props.isLoggedInUsersMessage ? "flex-end" : "flex-start",
      maxWidth: "80%",
      minWidth: "30%"
    },
    card: {
      display: "flex",
      flexDirection: "row",
      margin: "10px",
      borderRadius: "15px"
    },
    cardHeader: {
      width: "80%",
      backgroundColor: "orange"
    }
  };

  hideDeleteModal = () => {
    this.setState({
      isDeleteDialogVisible: false
    });
  };
  hideEditModal = () => {
    this.setState({
      isEditDialogVisible: false
    });
  };

  handleDelete = _e => this.setState({ isDeleteDialogVisible: true });
  handleEdit = _e => this.setState({ isEditDialogVisible: true });

  timeView = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };

  render() {
    return (
      <Grid item style={this.style.grid}>
        <Card raised={true} style={this.style.card}>
          <CardHeader
            title={this.props.item.message}
            subheader={new Date(this.props.item.sendDate).toLocaleString(
              "en-US",
              this.timeView
            )}
            style={this.style.cardHeader}
          />
          <MessageCardControl
            {...this.props}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
        </Card>

        {this.state.isDeleteDialogVisible ? (
          <DeleteMessageDialog
            open={this.state.isDeleteDialogVisible}
            {...this.props}
            delete={this.props.delete}
            id={this.props.item.id}
            hideModal={this.hideDeleteModal}
          />
        ) : null}
        {this.state.isEditDialogVisible ? (
          <EditMessageDialog
            open={this.state.isEditDialogVisible}
            originalMessage={this.props.item.message}
            {...this.props}
            edit={this.props.edit}
            id={this.props.item.id}
            hideModal={this.hideEditModal}
          />
        ) : null}
      </Grid>
    );
  }
}
