import React, { Component } from 'react'
import { Edit, Delete } from '@material-ui/icons'
import { Card, Divider } from '@material-ui/core'
import { IconButton } from '@material-ui/core/IconButton'

export class NewsItem extends Component {
    state = {
        editmodalVis: false,
        deleteModalVis: false
    }

    editModalVis = () => {
        this.setState({
            editModalVis: false
        })
    }

    deleteModalVis = () => {
        this.setState({
            deleteModalVis: false
        })
    }

    handleEdit = (_e) => {
        this.setState({ editmodalVis: true })
    }

    handleDelete = (_e) => {
        this.setState({ deleteModalVis: true })
    }

    render() {
        return (
            <div className="container">

                <Card>
                    <div className="card-header">
                        <img src={this.props.item.urlImg} alt="News" classname="newsImg" />
                        <h2>{this.props.item.title}</h2>
                        <h4>Date Added: {this.props.item.dateAdded}</h4>
                    </div>
                    <div className="card-body">
                        <h3>{this.props.item.synopsis}</h3>
                        <a href={this.props.item.url}>Visit Article</a>
                        <div className="btnContainer">
                            <IconButton>
                                <Edit action={this.handleEdit} />
                            </IconButton>
                            <Delete action={this.handleDelete} />
                        </div>
                    </div>
                </Card>
                {
                    this.state.editModalVis ? <EditNewsModal
                        {...this.props}
                        edit={this.props.edit}
                        newsId={this.props.item.id}
                        modalVis={this.editModalVis} /> : null
                }
                {
                    this.state.deleteModalVis ? <DeleteNewsModal
                        {...this.props}
                        delete={this.props.delete}
                        newsId={this.props.item.id}
                        modalVis={this.editModalVis} /> : null
                }
            </div>
        )
    }
}

export default NewsItem
