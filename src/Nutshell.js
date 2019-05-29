import React, { Component } from "react";
import { withRouter } from 'react-router'
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ApplicationViews from "./components/ApplicationViews";
import API from "./modules/dbCalls"

class Nutshell extends Component {
  state = {
    isUserLoggedIn: true
  };

  login = (username, password) => {
    API.loginUser(username, password).then(user => {
      if (user.length === 0) {
        alert("username and email do not match")
      } else {
        sessionStorage.setItem("activeUser", user[0].id)
        this.setState({ isUserLoggedIn: true })
        this.props.history.push('/')
      }

    })
  }

  register = (username, email, password) => {
    const newUser = {
      username: username,
      email: email,
      password: password
    }

    API.getAllUsers().then(users => {
      if (users.find(user =>
        username === user.username || email === user.email
      ) !== undefined) {
        alert("You are already a user")
      } else {
        API.addUser(newUser).then(newuserInfo => {
          this.login(newuserInfo.username, newuserInfo.password)
          this.props.history.push('/')
        })
      }
    })

  }

  logout = () => {
    sessionStorage.removeItem("activeUser")
    this.props.history.push('/login')
  }

  render() {
    return (
      <>
        <Navbar loggedIn={this.state.isUserLoggedIn}
          logout={this.logout} />
        <Sidebar loggedIn={this.state.isUserLoggedIn} />
        <ApplicationViews loggedIn={this.state.isUserLoggedIn}
          login={this.login} register={this.register} />
      </>
    );
  }
}

export default withRouter(Nutshell)
