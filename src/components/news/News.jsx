import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import NewsItem from "./NewsItem";
import API from '../../modules/dbCalls'

export default class News extends Component {
  makeNews = news => news.map(item => <NewsItem delete={this.confirmDelete} key={item.id} item={item} />);

  state = {
    news: []
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

  async componentDidMount() {
    const newState = {
      news: await API.getUserNews(sessionStorage.getItem("activeUser")).catch((_error) => []),
    }
    this.setState(newState)
  }

  render() {
    return (
      <Paper>
        <h2>Breaking News:</h2>
        <Grid container spacing={2} alignItems="stretch" className="newsContainer" wrap="wrap" direction="row">{this.makeNews(this.state.news)}</Grid>
      </Paper>
    );
  }
}
