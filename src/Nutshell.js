import React, { Component } from "react";
import Navbar from "./components/nav/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ApplicationViews from "./components/ApplicationViews";

export default class Nutshell extends Component {
  state = {
    isUserLoggedIn: false
  };

  render() {
    return (
      <>
        <Navbar loggedIn={this.state.isUserLoggedIn} />
        <Sidebar loggedIn={this.state.isUserLoggedIn} />
        <ApplicationViews loggedIn={this.state.isUserLoggedIn} />
      </>
    );
  }
}
