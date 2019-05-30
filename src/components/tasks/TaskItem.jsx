import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import Modal from 'react-modal'
import './tasks.css'
import moment from 'moment'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('div')

export default class taskItem extends Component {
    state = {
        isChecked: null,
        modalIsOpen: false
    }


    handleCheck = (evt) => {
        if (this.state.isChecked === false) {
            this.setState({ isChecked: true })
        }
    }

    handleEdit = (evt) => {
        this.setState(
            {
                editNameVis: false,
            }
        )
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }


    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div key={this.props.task.id} className="listItem">

                <h2 className="taskName">{this.props.task.name}</h2>
                <h3 className="taskDate">Date: {moment(this.props.task.targetCompletionDate).format('MMM-DD')}</h3>
                <h4 className="completed">Completed: </h4>
                <div className="checkbox">
                    <Checkbox
                        edge="end"
                    // onChange={handleToggle(value)}
                    // checked={checked.indexOf(value) !== -1}
                    />
                </div>
                <div className="editTaskButton">
                    <Fab size="small" color="secondary" aria-label="Edit" >
                        <EditIcon onClick={this.openModal} />
                    </Fab>
                </div>
                <div className="deleteTaskButton">
                    <Fab size="small" aria-label="Delete" >
                        <DeleteIcon />
                    </Fab>
                </div>
                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    addTask={this.addTask}
                    style={customStyles}>
                    <h2>Edit Task</h2>
                    <TextField
                        id="standard-name"
                        label="Task"
                        className="taskToEdit"
                        // onChange=""
                        margin="normal"
                        value={this.props.task.name}
                    />
                    <TextField
                        id="date"
                        label="Date to complete by"
                        type="date"
                        defaultValue={this.props.task.targetCompletionDate}
                        className="dateToEdit"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button onClick={
                        () => {
                            this.setState(
                                { saveDisabled: true },
                                () => this.props.addTask(this.props.animal.id)
                            )
                        }
                    }
                        disabled={this.state.saveDisabled}
                        className="card-link">Save</Button>
                    <Button onClick={this.closeModal}>Cancel</Button>
                </Modal>
            </div>
        )
    }
}