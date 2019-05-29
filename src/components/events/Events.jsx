import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import EventItem from "./EventItem";

export default class Events extends Component {
  makeEvent = events =>
    events.map(event => <EventItem key={event.id} event={event} />);

  render() {
    return (
      <Paper>
        <h2>Events near you:</h2>
        <div className="eventContainer">
          {this.makeEvent(this.props.events)}
        </div>
      </Paper>
    );
  }
}
