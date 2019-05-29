import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography, Tabs, Tab } from "@material-ui/core";
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
    tabValue: 0
  };

  links = [
    {
      key: 1,
      name: "News",
      icon: Whatshot,
      href: "/",
      linkAction: ""
    },
    {
      key: 2,
      name: "Tasks",
      icon: FormatListNumbered,
      href: "/tasks",
      linkAction: ""
    },
    {
      key: 3,
      name: "Events",
      icon: Event,
      href: "/events",
      linkAction: ""
    },
    {
      key: 4,
      name: "Chat",
      icon: Message,
      href: "/chat",
      linkAction: ""
    }
  ];
  logoutLink = {
    key: 5,
    name: "Logout",
    icon: LockOpen,
    href: "/login",
    linkAction: ""
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  makeLink = link => {
    const Icon = link.icon;
    return (
      <li key={link.key} className="navbar-item">
        <Link className="navbar-link" to="/">
          <Icon className="navbar-icon" />
          <p>{link.name}</p>
        </Link>
      </li>
    );
  };

  render() {
    return (
      <AppBar color="primary" position="static" className="navbar">
        <div className="navbar navbar-flexrow">
          <Typography variant="h4" component="h2" color="inherit">
            Nutshell
          </Typography>
          <div className="navbar-linkContainer navbar-flexrow">
            <ul className="navbar-ul navbar-flexrow">
              {this.links.map(this.makeLink)}
            </ul>

            <div className="navbar-logoutContainer">
              {this.makeLink(this.logoutLink)}
            </div>
          </div>
        </div>
      </AppBar>
    );
  }
}
