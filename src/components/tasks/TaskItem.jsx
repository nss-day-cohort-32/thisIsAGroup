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
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        border: '4px solid #6E1EE8',
        padding: '4% 4%'
    }
};

Modal.setAppElement('div')

export default class taskItem extends Component {
    state = {
        completed: null,
        modalIsOpen: false,
        taskName: "",
        taskDate: ""
    }

    saveCheck = (id) => {
        const checked = {
            completed: this.state.completed
        }

        this.props.updateCheck(id, checked)
    }


    handleCheck = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveUpdate = (id) => {
        const updatedTask = {
            completed: this.state.completed,
            name: this.state.taskName,
            targetCompletionDate: this.state.taskDate
        }

        this.props.updateTask(id, updatedTask)
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
                        id="completed"
                        edge="end"
                        onChange={this.handleFieldChange}
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
                        <DeleteIcon onClick={
                            () => {
                                this.setState({ saveDisabled: true },
                                    () => this.props.deleteTask(this.props.task.id))
                            }
                        } />
                    </Fab>
                </div>
                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    addTask={this.addTask}
                    style={customStyles}>
                    <h2>Edit Task</h2>
                    <TextField
                        id="taskName"
                        label="Task"
                        className="taskToEdit"
                        onChange={this.handleFieldChange}
                        margin="normal"
                        placeholder={this.props.task.name}
                    />
                    <TextField
                        id="taskDate"
                        label="Date to complete by"
                        type="date"
                        onChange={this.handleFieldChange}
                        defaultValue={this.props.task.targetCompletionDate}
                        className="dateToEdit"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button onClick={
                        () => {
                            this.setState(
                                {
                                    saveDisabled: true,
                                    modalIsOpen: false
                                },
                                () => this.saveUpdate(this.props.task.id)
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