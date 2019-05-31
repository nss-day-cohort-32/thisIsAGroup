import React, { Component } from 'react'
import { DialogContent, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class EditEventsModal extends Component {
    state = {
        name: null,
        description: null,
        location: null,
        url: null
    }

    componentDidMount() {
        const newState = {
            name: this.props.item.name,
            description: this.props.item.description,
            url: this.props.item.url,
            location: this.props.item.location
        }
        this.setState(newState)
    }

    editEvents = () => {

        const eventsObj = {
            userId: sessionStorage.getItem("activeUser"),
            name: this.state.name,
            description: this.state.description,
            eventDate: null,
            location: this.state.description,
            url: this.state.url
        }

        let eventsID = this.props.id

        this.props.edit(eventsID, eventsObj)
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
                    <TextField autoFocus margin="normal" id="name" label="Name" type="text" variant="outlined" defaultValue={this.state.name} onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="url" label="Image" type="text" variant="outlined" defaultValue={this.state.url} onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="description" label="Description" type="text" variant="outlined" defaultValue={this.state.description} multiline rows="5" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="location" label="Location" type="text" variant="outlined" defaultValue={this.state.location} onChange={this.handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={this.editEvents}>SUBMIT</Button>
                    <Button color="secondary" variant="contained" onClick={this.props.hideModal}>CLOSE</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default EditEventsModal
