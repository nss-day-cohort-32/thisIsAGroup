import React, { Component } from 'react'
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class CreateNewsModal extends Component {


    editNews = () => {

        const newsObj = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            dateAdded: dateTime,
            url: this.state.url
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
