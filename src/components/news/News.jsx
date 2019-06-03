import React, { Component } from "react";
import { Grid, Paper, Fab, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import NewsItem from "./NewsItem";
import API from '../../modules/dbCalls';
import CreateNewsModal from './CreateNewsModal';

export default class News extends Component {
  makeNews = news => news.map(item => <NewsItem delete={this.confirmDelete} edit={this.editNews} key={item.id} item={item} />);

  state = {
    news: [],
    createModalVis: false
  }

  hideCreateModal = () => {
    this.setState({
      createModalVis: false
    })
  }

  handleCreate = (_e) => {
    this.setState({ createModalVis: true })
  }

  confirmDelete = (newsId) => {
    API.deleteNews(newsId)
      .then(_reply => {
        API.getUserNews(sessionStorage.getItem("activeUser"))
          .then(news => {
            this.setState({ news })
          })
      })
  }

  editNews = (id, obj) => {
    API.editNews(id, obj)
      .then(_reply => {
        API.getUserNews(sessionStorage.getItem("activeUser"))
          .then(news => {
            this.setState({ news })
          })
      })
  }

  addNews = (obj) => {
    API.addNews(obj)
      .then(_reply => {
        API.getUserNews(sessionStorage.getItem("activeUser"))
          .then(news => {
            this.setState({ news })
          })
      })
  }

  async componentDidMount() {
    const newState = {
      news: await API.getUserNews(sessionStorage.getItem("activeUser")).catch((_error) => []),
    }
    this.setState(newState)
  }

  render() {
    return (
      <Paper>
        <div className="top">
          <Grid container direction="row" wrap="nowrap" justify="space-between" alignItems="center" >
            <div className="heading">
              <Grid item>
                <Typography variant="h3">
                  Breaking News
          </Typography>
              </Grid>
            </div>
            <Grid item>
              <Fab color="secondary" onClick={this.handleCreate}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2} alignItems="stretch" className="newsContainer" wrap="wrap" direction="row">{this.makeNews(this.state.news)}</Grid>
        {
          this.state.createModalVis ? <CreateNewsModal
            {...this.props}
            create={this.addNews}
            hideModal={this.hideCreateModal}
            modalVis={this.state.createModalVis} /> : null
        }
      </Paper >
    );
  }
}
