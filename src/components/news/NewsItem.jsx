import React, { Component } from "react";
import { Link } from "@material-ui/icons";
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
import EditNewsModal from "./EditNewsModal";
import DeleteNewsModal from "./DeleteNewsModal";
import CardButtons from "../../modules/CardButtons";

export class NewsItem extends Component {
  state = {
    editModalVis: false,
    deleteModalVis: false,
    isUserItem: false
  };

  componentDidMount() {
    const user = parseInt(sessionStorage.getItem("activeUser"));
    const itemId = this.props.item.userId;
    if (user === itemId) {
      this.setState({ isUserItem: true });
    }
  }

  paper = {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    boxShadow: [
      [0, 14, 28, "rgba(0,0,0,0.25)"],
      [0, 10, 10, "rgba(0,0,0,0.22)"]
    ],
    padding: 10,
    outline: "none"
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

  render() {
    return (
      <Grid item lg={4} md={6} sm={12}>
        <Card raised={true}>
          <CardMedia
            component="img"
            image={this.props.item.urlImg}
            title="News"
          />
          <CardHeader
            title={this.props.item.title}
            subheader={"Date Added: " + this.props.item.dateAdded}
            action={
              <IconButton href={this.props.item.urlSrc}>
                <Link />
              </IconButton>
            }
          />

          <CardContent>
            <Typography variant="body2" component="p">
              {this.props.item.synopsis}
            </Typography>
          </CardContent>
          <div className="btnContainer">
            {this.state.isUserItem ? (
              <CardButtons
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            ) : null}
          </div>
        </Card>
        {this.state.editModalVis ? (
          <EditNewsModal
            {...this.props}
            edit={this.props.edit}
            item={this.props.item}
            id={this.props.item.id}
            hideModal={this.hideEditModal}
            modalVis={this.state.editModalVis}
          />
        ) : null}
        {this.state.deleteModalVis ? (
          <DeleteNewsModal
            {...this.props}
            delete={this.props.delete}
            newsId={this.props.item.id}
            hideModal={this.hideDeleteModal}
            modalVis={this.state.deleteModalVis}
          />
        ) : null}
      </Grid>
    );
  }
}

export default NewsItem;
