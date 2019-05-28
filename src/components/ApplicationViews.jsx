import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
//import API from "../modules/dbCalls";
import Tasks from "./tasks/Tasks";
import Events from "./events/Events";
import News from "./news/News";
import Chat from "./chat/Chat";
import Login from "./auth/Login";
//import { ProtectedRoute } from "./ProtectedRoute";

class ApplicationViews extends Component {
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

  render() {
    return (
      <>
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/"
          render={props => {
            if (this.props.loggedIn) {
              return <News />;
            } else return <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/events"
          render={props => {
            if (this.props.loggedIn) {
              return <Events />;
            } else return <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/chat"
          render={props => {
            if (this.props.loggedIn) {
              return <Chat />;
            } else return <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/tasks"
          render={props => {
            if (this.props.loggedIn) {
              return <Tasks />;
            } else return <Redirect to="/login" />;
          }}
        />
        {/*
        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/"
          render={props => <News {...props} />}
        />

        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/events"
          render={props => <Events {...props} />}
        />

        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/tasks"
          render={props => <Tasks {...props} />}
        />

        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/chat"
          render={props => <Chat {...props} />}
        /> */}
      </>
    );
  }
}

export default withRouter(ApplicationViews);
