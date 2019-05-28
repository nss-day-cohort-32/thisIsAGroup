import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography } from "@material-ui/core";
import {
  Event,
  Whatshot,
  People,
  FormatListNumbered,
  Message,
  VerifiedUser,
  LockOpen
} from "@material-ui/icons";

import "./navbar.css";

export default class Navbar extends Component {
  state = {
    isUserLoggedIn: true,
    links: [
      {
        key: 1,
        name: "Events",
        icon: Event
      },
      {
        key: 2,
        name: "Messages",
        icon: Event
      },
      {
        key: 3,
        name: "Events",
        icon: Event
      },
      {
        key: 4,
        name: "Events",
        icon: Event
      }
    ]
  };

  render() {
    return (
      <AppBar color="primary" position="static">
        <div className="navbar-outerContainer">
          <Typography variant="h2" className="navbar-title">
            Nutshell
          </Typography>
        </div>
        <div className="navbar-link-container">
          <ul className="navbar-ul">
            <li className="navbar-item">
              <Link className="navbar-link" to="/news" />
              <Whatshot />
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/tasks" />
              <FormatListNumbered />
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="/messages" />
              <Message />
            </li>
          </ul>
        </div>
      </AppBar>
    );
  }
}
