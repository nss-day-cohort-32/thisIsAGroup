import React, { Component } from 'react'
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class CreateNewsModal extends Component {
    state = {
        title: null,
        synopsis: null,
        dateAdded: null,
        url: null
    }

    handleDel = () => {
        this.props.delete(this.props.newsId)
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
                    <TextField margin="normal" id="urlImg" label="Image" type="text" variant="outlined" onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="synopsis" label="Synopsis" type="text" variant="outlined" multiline rows="5" onChange={this.handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={this.handleDel}>SUBMIT</Button>
                    <Button className="" variant="contained" onClick={this.props.hideModal}>CLOSE</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default CreateNewsModal
