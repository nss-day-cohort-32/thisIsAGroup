import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import API from "../modules/dbCalls";
import Tasks from "./tasks/Tasks";
import Events from "./events/Events";
import News from "./news/News";
import Chat from "./chat/Chat";
import Login from "./auth/Login";

export default class ApplicationViews extends Component {
  state = {
    loggedInUser: [],
    tasks: [],
    friends: [],
    news: [],
    messages: [],
    events: []
  };

  // async fetchAll() {
  //   this.setState({
  //     tasks: await API.geta
  //   });
  // }

  redirectOrGoTo = route => {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    } else return route;
  };

  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={props => {
            this.redirectOrGoTo(<News {...props} />);
          }}
        />

        <Route
          exact
          path="/tasks"
          render={props => {
            this.redirectOrGoTo(<Tasks {...props} />);
          }}
        />

        <Route
          exact
          path="/events"
          render={props => {
            this.redirectOrGoTo(<Events {...props} />);
          }}
        />

        <Route
          exact
          path="/chat"
          render={props => {
            this.redirectOrGoTo(<Chat {...props} />);
          }}
        />

        <Route path="/login">
          <Login />
        </Route>
      </>
    );
  }
}
