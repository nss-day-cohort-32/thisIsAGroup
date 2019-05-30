import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import './tasks.css'
import TaskItem from './TaskItem'
import Modal from 'react-modal'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'


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


export default class Tasks extends Component {

  state = {
    saveDisabled: false,
    modalIsOpen: false,
    taskToAdd: "",
    dateToAdd: ""
  }


  openModal = () => {
    this.setState({ modalIsOpen: true });
  }


  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  makeNewTask = (evt) => {
    if (this.state.name === "") {
      window.alert("please complete form")
    } else {
      const loggedInUser = sessionStorage.getItem('activeUser')
      const task = {
        userId: loggedInUser,
        name: this.state.taskToAdd,
        targetCompletionDate: this.state.dateToAdd,
        completed: false,
      }

      this.props.addTask(task)
    }
  }


  render() {
    return (

      <div className="list">
        <div>
          <div className="addTask">
            <Fab color="primary" aria-label="Add" >
              <AddIcon onClick={this.openModal} />
            </Fab>
          </div>
          <Modal isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            addTask={this.addTask}
            style={customStyles}>
            <h2>New Task</h2>
            <TextField
              id="taskToAdd"
              label="Task"
              className="taskToAdd"
              onChange={this.handleFieldChange}
              margin="normal"
            />
            <TextField
              id="dateToAdd"
              label="Date to complete by"
              type="date"
              defaultValue="2017-05-24"
              className="dateToAdd"
              onChange={this.handleFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button onClick={() => {
              this.setState(
                {
                  saveDisabled: true,
                  modalIsOpen: false
                },
                () => this.makeNewTask()
              )
            }}
              disabled={this.state.saveDisabled}
              className="card-link">Add</Button>
            <Button onClick={this.closeModal}>Cancel</Button>
          </Modal>
        </div >
        {this.props.tasks.map(task => {
          return <TaskItem key={task.id} task={task} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask}
          updateCheck={this.props.updateCheck} />
        })}
      </div>
    );
  }
}