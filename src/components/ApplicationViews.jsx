import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from 'react-router'
import API from "../modules/dbCalls";
import Tasks from "./tasks/Tasks";
import Events from "./events/Events";
import News from "./news/News";
import Chat from "./chat/Chat";
import SignIn from "./auth/Login";
import SignUp from "./auth/SignUp"

class ApplicationViews extends Component {
  state = {
    loggedInUser: [],
    tasks: [],
    friends: [],
    news: [],
    messages: [],
    events: [],
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

        <Route exact path="/login" render={props => {
          return <SignIn {...props} loggedIn={this.props.isUserLoggedIn}
            login={this.props.login} />
        }}
        />


        <Route exact path="/sign-up" render={props => {
          return <SignUp {...props} loggedIn={this.props.isUserLoggedIn}
            register={this.props.register} />
        }}
        />
      </>
    );
  }
}

export default withRouter(ApplicationViews)
