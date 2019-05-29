import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import NewsItem from "./NewsItem";

export default class News extends Component {
  makeNews = news => news.map(item => <NewsItem key={item.id} item={item} />);

  render() {
    return (
      <Paper>
        <h2>Breaking News:</h2>
        <div className="newsContainer">{this.makeNews(this.props.news)}</div>
      </Paper>
    );
  }
}
