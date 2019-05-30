import React, { Component } from 'react'
import { DialogContent, DialogActions, Dialog, DialogTitle, Button, TextField } from '@material-ui/core';


export class EditNewsModal extends Component {
    state = {
        title: null,
        synopsis: null,
        urlImg: null
    }

    componentDidMount() {
        const newState = {
            title: this.props.item.title,
            synopsis: this.props.item.synopsis,
            urlImg: this.props.item.urlImg
        }
        this.setState(newState)
    }

    editNews = () => {

        const newsObj = {
            title: this.state.title,
            synopsis: this.state.synopsis,
            urlImg: this.state.urlImg
        }

        let newsID = this.props.id

        this.props.edit(newsID, newsObj)
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
                    <TextField autoFocus margin="normal" id="title" label="Title" type="text" variant="outlined" defaultValue={this.state.title} onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" id="url" label="Image" type="text" variant="outlined" defaultValue={this.state.urlImg} onChange={this.handleChange} fullWidth />
                    <TextField margin="normal" defaultValue={this.state.synopsis} id="synopsis" label="Synopsis" type="text" variant="outlined" multiline rows="5" onChange={this.handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={this.editNews}>SUBMIT</Button>
                    <Button color="secondary" variant="contained" onClick={this.props.hideModal}>CLOSE</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default EditNewsModal
