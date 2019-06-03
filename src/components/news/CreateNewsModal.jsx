import React, { Component } from 'react'
import { DialogContent, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class CreateNewsModal extends Component {
    state = {
        title: null,
        synopsis: null,
        url: null,
        urlSrc: null
    }

    addNews = () => {
        var dateTime = new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        });

        const newsObj = {
            userId: parseInt(sessionStorage.getItem("activeUser")),
            title: this.state.title,
            synopsis: this.state.synopsis,
            dateAdded: dateTime,
            urlImg: this.state.url,
            urlSrc: this.state.urlSrc
        }

        this.props.create(newsObj)
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

                <DialogTitle>Add News</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="normal" id="title" label="Title" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="url" label="Image" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="urlSrc" label="News Link" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="synopsis" label="Synopsis" type="text" variant="outlined" multiline rows="5" onChange={this.handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={this.addNews}>SUBMIT</Button>
                    <Button color="secondary" variant="contained" onClick={this.props.hideModal}>CLOSE</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default CreateNewsModal
