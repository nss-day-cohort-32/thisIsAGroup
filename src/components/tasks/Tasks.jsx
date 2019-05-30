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
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('div')


export default class Tasks extends Component {

  state = {
    saveDisabled: false,
    modalIsOpen: false
  }


  openModal = () => {
    this.setState({ modalIsOpen: true });
  }


  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
              id="standard-name"
              label="Task"
              className="taskToAdd"
              // onChange=""
              margin="normal"
            />
            <TextField
              id="date"
              label="Date to complete by"
              type="date"
              defaultValue="2017-05-24"
              className="datToAdd"
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
              className="card-link">Add</Button>
            <Button onClick={this.closeModal}>Cancel</Button>
          </Modal>
        </div >
        {this.props.tasks.map(task => {
          return <TaskItem key={task.id} task={task} />
        })}
      </div>
    );
  }
}