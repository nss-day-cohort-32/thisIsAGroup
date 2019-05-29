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
    tabValue: "/"
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
    linkAction: "",
    onClick: this.handleLogout
  };

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleLogout = () => {
    this.props.logout()
  };

  makeIcon = Icon => <Icon />;

  makeLink = link => {
    return (
      <Tab
        key={link.key}
        label={link.name}
        value={link.href}
        component={Link}
        to={link.href}
        icon={this.makeIcon(link.icon)}
      />
    );
  };

  render() {
    return (
      <AppBar color="primary" position="static" className="navbar">
        <div className="navbar navbar-flexrow">
          <div>
            <Typography variant="h4" component="h2" color="inherit">
              Nutshell
            </Typography>
          </div>
          <div className="navbar-linkContainer navbar-flexrow">
            <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
              {this.links.map(this.makeLink)}
            </Tabs>

            <div className="navbar-logoutContainer" onClick={this.handleLogout}>
              {this.makeLink(this.logoutLink)}
            </div>
          </div>
        </div>
      </AppBar>
    );
  }
}
