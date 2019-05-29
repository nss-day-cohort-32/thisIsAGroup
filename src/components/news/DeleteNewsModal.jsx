import React, { Component } from 'react'
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Button } from '@material-ui/core';
import './news.css'


export class DeleteNewsModal extends Component {


    confirmDelete = () => {
        this.props.delete(this.props.newsId)
    }
    render() {
        return (
            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.modalVis}
                onClose={this.props.hideModal}
            >

                <DialogTitle>Are you sure you want to delete this news article?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleted articles cannot be recovered
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="deleteBtn" variant="contained" onClick={this.confirmDelete}>YES</Button>
                    <Button className="" variant="contained" onClick={this.props.hideModal}>NO</Button>
                </DialogActions>

            </Dialog >
        )
    }
}

export default DeleteNewsModal
