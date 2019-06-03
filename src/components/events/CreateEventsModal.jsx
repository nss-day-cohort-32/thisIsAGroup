import React, { Component } from 'react'
import { DialogContent, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class CreateEventsModal extends Component {
    state = {
        name: null,
        description: null,
        location: null,
        url: null
    }

    addEvents = () => {
        var dateTime = new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        });

        const eventsObj = {
            userId: sessionStorage.getItem("activeUser"),
            name: this.state.name,
            description: this.state.description,
            eventDate: dateTime,
            location: this.state.description,
            url: this.state.url
        }

        this.props.create(eventsObj)
        this.props.hideModal()
    }

    handleChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.modalVis}
                onClose={this.props.hideModal}
            >

                <DialogTitle>Add Events</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="normal" id="name" label="Name" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField id="datetime-local" defaultValue={new Date()} label="Event Date:" type="datetime-local" InputLabelProps={{
                        shrink: true,
                    }}
                    />

                    <TextField margin="normal" id="url" label="Image" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="description" label="Description" type="text" variant="outlined" multiline rows="5" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="location" label="Location" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={this.addEvents}>SUBMIT</Button>
                    <Button color="secondary" variant="contained" onClick={this.props.hideModal}>CLOSE</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default CreateEventsModal
