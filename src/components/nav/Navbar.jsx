import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import {
  Event,
  Whatshot,
  FormatListNumbered,
  Message,
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
      <AppBar color="primary" position="static" className="navbar">
        <div className="navbar navbar-flexrow">
          <h2 className="navbar-title">Nutshell</h2>
          <div className="navbar-linkContainer navbar-flexrow">
            <ul className="navbar-ul navbar-flexrow">
              <li className="navbar-item">
                <Link className="navbar-link" to="/">
                  <Whatshot className="navbar-icon" />
                  <p>News</p>
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/tasks">
                  <FormatListNumbered className="navbar-icon" />
                  <p>Tasks</p>
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/events">
                  <Event className="navbar-icon" />
                  <p>Events</p>
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="navbar-link" to="/chat">
                  <Message className="navbar-icon" />
                  <p>Chat</p>
                </Link>
              </li>
            </ul>

            <div className="navbar-logoutContainer">
              <Link className="navbar-link" to="/login">
                <LockOpen className="navbar-icon" />
                <p>Logout</p>
              </Link>
            </div>
          </div>
        </div>
      </AppBar>
    );
  }
}
