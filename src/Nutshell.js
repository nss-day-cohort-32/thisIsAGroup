import React, { Component } from "react";
import { withRouter } from "react-router";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ApplicationViews from "./components/ApplicationViews";
import API from "./modules/dbCalls";
import { CustomTheme } from "./components/CustomTheme";
import { Container } from "@material-ui/core";

class Nutshell extends Component {
  constructor(props) {
    super(props);
    let user = sessionStorage.getItem("activeUser");
    this.state = {
      friends: [],
      friendRequests: []
    };
    if (!!user) {
      this.state.isUserLoggedIn = true;
      this.getFriends();
    } else this.state.isUserLoggedIn = false;
  }

  ///////////////////////////////// start Friends Area //////////////////////////////////////
  getFriends = () => {
    const newState = {};
    API.getFriendsList(sessionStorage.getItem("activeUser"), "true", "true")
      .then(friends => {
        newState.friends = friends;
      })
      .then(() =>
        API.getFriendsList(
          sessionStorage.getItem("activeUser"),
          "false",
          "false"
        )
      )
      .then(friends => (newState.friendRequests = friends))

      .then(() => this.setState(newState));
  };

  deleteFriend = async (id, friendId) => {
    console.log(friendId);
    await API.deleteFriend(friendId, id);
    await API.deleteFriend(id, friendId);

    const newState = {
      friends: await API.getFriendsList(id, "true", "true")
    };
    this.setState(newState);
  };

  sendFriendRequest = () => {};

  /////////////////////////////////// End Friends Area //////////////////////////////////////
  login = (username, password) => {
    API.loginUser(username, password).then(user => {
      if (user.length === 0) {
        alert("username and password do not match");
      } else {
        sessionStorage.setItem("activeUser", user[0].id);
        this.setState({ isUserLoggedIn: true });
        this.props.history.push("/");
        this.getFriends();
      }
    });
  };

  register = (username, email, password) => {
    const newUser = {
      username: username,
      email: email,
      password: password
    };

    API.getAllUsers().then(users => {
      if (
        users.find(
          user => username === user.username || email === user.email
        ) !== undefined
      ) {
        alert("You are already a user");
      } else {
        API.addUser(newUser).then(newuserInfo => {
          this.login(newuserInfo.username, newuserInfo.password);
          this.props.history.push("/");
        });
      }
    });
  };

  logout = () => {
    sessionStorage.removeItem("activeUser");
    this.setState({ isUserLoggedIn: false });
    this.props.history.push("/login");
  };

  render() {
    return (
      <CustomTheme>
        <Navbar loggedIn={this.state.isUserLoggedIn} logout={this.logout} />
        {this.state.isUserLoggedIn ? (
          <div
            className="nutshell-contentContainer"
            style={{
              height: "calc(100% - 72px)",
              marginTop: "72px"
            }}>
            <Sidebar
              loggedIn={this.state.isUserLoggedIn}
              friends={this.state.friends}
              friendRequests={this.state.friendRequests}
              deleteFriend={this.deleteFriend}
              friendRequests={this.state.friendRequests}
            />
            <div style={{ marginLeft: "200px", width: "100%" }}>
              <ApplicationViews
                loggedIn={this.state.isUserLoggedIn}
                login={this.login}
                register={this.register}
              />
            </div>
          </div>
        ) : (
          <ApplicationViews
            loggedIn={this.state.isUserLoggedIn}
            login={this.login}
            register={this.register}
          />
        )}
      </CustomTheme>
    );
  }
}

export default withRouter(Nutshell);
