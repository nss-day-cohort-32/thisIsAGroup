import React, { Component } from 'react'
import { IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

export default class CardButtons extends Component {
    render() {
        return (
            <>
                <IconButton onClick={this.handleEdit} >
                    <Edit />
                </IconButton>
                <IconButton onClick={this.handleDelete}>
                    <Delete />
                </IconButton>
            </>
        )
    }
}
