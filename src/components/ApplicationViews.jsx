import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import API from "../modules/dbCalls";
import Tasks from "./tasks/Tasks";
import Events from "./events/Events";
import News from "./news/News";
import SignIn from "./auth/Login";
import SignUp from "./auth/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import Messages from "./messages/Messages";

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

  componentDidMount() {
    const loggedInUser = sessionStorage.getItem("activeUser");
    const newState = {};

    API.getUserTasks(loggedInUser)
      .then(tasks => (newState.tasks = tasks))
      .then(() => this.setState(newState));
  }

  addTask = task => {
    const loggedInUser = sessionStorage.getItem("activeUser");
    API.addTask(task)
      .then(() => API.getUserTasks(loggedInUser))
      .then(tasks => this.setState({ tasks: tasks }))
      .then(() => this.props.history.push("/tasks"));
  };

  deleteTask = taskId => {
    const loggedInUser = sessionStorage.getItem("activeUser");
    API.deleteTask(taskId)
      .then(() => API.getUserTasks(loggedInUser))
      .then(tasks => {
        this.props.history.push("/tasks");
        this.setState({
          tasks: tasks
        });
      });
  };

  updateTask = (taskId, obj) => {
    const loggedInUser = sessionStorage.getItem("activeUser");
    API.editTask(taskId, obj)
      .then(() => API.getUserTasks(loggedInUser))
      .then(tasks => {
        this.props.history.push("/tasks");
        this.setState({
          tasks: tasks
        });
      });
  };

  updateCheck = (taskId, obj) => {
    const loggedInUser = sessionStorage.getItem("activeUser");
    API.editTask(taskId, obj)
      .then(() => API.getUserTasks(loggedInUser))
      .then(tasks => {
        this.props.history.push("/tasks");
        this.setState({
          tasks: tasks
        });
      });
  };

  render() {
    return (
      <div
        className="applicationViews"
        style={{
          width: "90%",
          margin: "1rem auto"
        }}>
        <Route
          exact
          path="/login"
          render={props => {
            return (
              <SignIn
                {...props}
                loggedIn={this.props.isUserLoggedIn}
                login={this.props.login}
              />
            );
          }}
        />

        <Route
          exact
          path="/sign-up"
          render={props => {
            return (
              <SignUp
                {...props}
                loggedIn={this.props.isUserLoggedIn}
                register={this.props.register}
              />
            );
          }}
        />

        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/tasks"
          render={props => (
            <Tasks
              tasks={this.state.tasks}
              {...props}
              addTask={this.addTask}
              deleteTask={this.deleteTask}
              updateTask={this.updateTask}
              updateCheck={this.updateCheck}
            />
          )}
        />

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
          render={props => <Events events={this.state.events} {...props} />}
        />

        <ProtectedRoute
          loggedIn={this.props.loggedIn}
          exact
          path="/messages"
          render={props => <Messages {...props} {...this.props} />}
        />
      </div>
    );
  }
}

export default withRouter(ApplicationViews);
