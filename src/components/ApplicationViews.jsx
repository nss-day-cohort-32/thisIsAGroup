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
    news: [{ id: 1, name: "Blah" }],
    messages: [],
    events: [{ id: 1, name: "Blah" }]
  };

  // async fetchAll() {
  //   this.setState({
  //     tasks: await API.geta
  //   });
  // }

  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={props => {
            if (this.props.loggedIn) {
              return <News news={this.state.news} />;
            } else return <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/events"
          render={props => {
            if (this.props.loggedIn) {
              return <Events events={this.state.events} />;
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

        {/* <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/"
          render={props => <News {...props} />}
        /> */}

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
        {/* <ProtectedRoute
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

export default withRouter(ApplicationViews)
