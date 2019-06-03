import React, { Component } from "react";
import { Grid, Paper, Fab, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EventItem from "./EventItem";
import API from '../../modules/dbCalls';
import CreateEventsModal from './CreateEventsModal';
import "./events.css"

export default class Events extends Component {
  makeEvent = events =>
    events.map(item => <EventItem key={item.id} delete={this.confirmDelete} edit={this.editEvents} item={item} />);

  state = {
    events: [],
    createModalVis: false
  }

  hideCreateModal = () => {
    this.setState({
      createModalVis: false
    })
  }

  handleCreate = (_e) => {
    this.setState({ createModalVis: true })
  }

  confirmDelete = (eventsId) => {
    API.deleteEvents(eventsId)
      .then(_reply => {
        API.getUserEvents(sessionStorage.getItem("activeUser"))
          .then(events => {
            this.setState({ events })
          })
      })
  }

  editEvents = (id, obj) => {
    API.editEvent(id, obj)
      .then(_reply => {
        API.getUserEvents(sessionStorage.getItem("activeUser"))
          .then(events => {
            this.setState({ events })
          })
      })
  }

  addEvents = (obj) => {
    API.addEvent(obj)
      .then(_reply => {
        API.getUserEvents(sessionStorage.getItem("activeUser"))
          .then(events => {
            this.setState({ events })
          })
      })
  }

  async componentDidMount() {
    const newState = {
      events: await API.getUserEvents(sessionStorage.getItem("activeUser")).catch((_error) => []),
    }
    this.setState(newState)
  }


  render() {
    return (
      <Paper>
        <div className="top">
          <Grid container direction="row" wrap="nowrap" justify="space-between" alignItems="center" >
            <div className="heading">
              <Grid item>
                <Typography variant="h3">
                  Events
        </Typography>
              </Grid>
            </div>
            <Grid item>
              <Fab color="secondary" onClick={this.handleCreate}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2} alignItems="stretch" className="eventsContainer" wrap="wrap" direction="row">{this.makeEvent(this.state.events)}</Grid>
        {
          this.state.createModalVis ? <CreateEventsModal
            {...this.props}
            create={this.addEvents}
            hideModal={this.hideCreateModal}
            modalVis={this.state.createModalVis} /> : null
        }
      </Paper >
    );
  }
}
