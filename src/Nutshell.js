import React, { Component } from "react";
import { withRouter } from "react-router";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ApplicationViews from "./components/ApplicationViews";
import API from "./modules/dbCalls";
import { CustomTheme } from "./components/CustomTheme";

class Nutshell extends Component {
  constructor(props) {
    super(props);
    this.user = sessionStorage.getItem("activeUser");
    this.state = {
      friends: [],
      friendRequests: [],
      outgoingFriendRequests: [],
      isUserLoggedIn: !!this.user
    };
  }

  ///////////////////////////////// start Friends Area //////////////////////////////////////
  getFriends = async () => {
    this.setState({
      friends: await API.getAcceptedFriendsList(
        sessionStorage.getItem("activeUser")
      ),
      friendRequests: await API.getFriendsList(
        sessionStorage.getItem("activeUser"),
        "false",
        "false"
      ),
      outgoingFriendRequests: await API.getFriendsList(
        sessionStorage.getItem("activeUser"),
        "false",
        "true"
      )
    });
  };

  clearState = () =>
    this.setState({
      friends: [],
      friendRequests: [],
      outgoingFriendRequests: [],
      isUserLoggedIn: !!this.user
    });

  acceptFriendRequest = friendId => {
    return API.acceptFriends(
      sessionStorage.getItem("activeUser"),
      friendId
    ).then(this.getFriends);
  };

  deleteFriend = (id, friendId) => {
    Promise.all([
      API.deleteFriend(friendId, id),
      API.deleteFriend(id, friendId)
    ]).then(this.getFriends);
  };

  sendFriendRequest = friendUserName => {
    console.log("Hello from send friend request");
    let myUserId = sessionStorage.getItem("activeUser");
    return API.addFriends(myUserId, friendUserName).then(this.getFriends);
  };

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
    this.clearState();
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
              getFriends={this.getFriends}
              outgoingFriendRequests={this.state.outgoingFriendRequests}
              acceptFriendRequest={this.acceptFriendRequest}
              sendFriendRequest={this.sendFriendRequest}
            />
            <div style={{ marginLeft: "200px", width: "100%" }}>
              <ApplicationViews
                loggedIn={this.state.isUserLoggedIn}
                friends={this.state.friends}
                friendRequests={this.state.friendRequests}
                deleteFriend={this.deleteFriend}
                getFriends={this.getFriends}
                login={this.login}
                outgoingFriendRequests={this.state.outgoingFriendRequests}
                acceptFriendRequest={this.acceptFriendRequest}
                sendFriendRequest={this.sendFriendRequest}
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
