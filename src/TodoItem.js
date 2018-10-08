import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
        }
    }

    edit = async (e) => {       
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    handleCheck = (e) => {
        this.props.editTask({id: this.props.id, doneyet : !this.props.doneyet} )
    }

    handleDelete = (e) => {
        this.props.deleteTask(this.props)
    }
    handleEdit = (e) => {
        let val = this.input.value
        this.props.editTask(this.props, val)
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    renderTitle = () => {
        return this.state.isEdit
            ?   <input
                    ref={input => this.input = input}
                    className="edit-title"
                    type="text"
                    defaultValue={this.props.title}
                    onBlur={this.handleEdit}
                    autoFocus
                />
            :   <p 
                    className={this.props.doneyet ? "title-crossed" : "title"}
                    onDoubleClick={this.props.doneyet ? null : this.edit}>
                        {this.props.title}
                </p>
    }

    renderCheckIcon = () => {
        return this.props.doneyet
            ? <i className="fas fa-check check-icon"></i>
            : null
    }

    render() {
        return (
            <div className="item-container">
                <div className="completed-check-box" onClick={this.handleCheck}>
                    {this.renderCheckIcon()}
                </div>
                <div className="title-container">
                    {this.renderTitle()}
                </div>
                <div className="delete-btn" onClick={this.handleDelete}>
                    <i className="fas fa-times delete-icon"></i>
                </div>
            </div>
        )
    }
}

export default TodoItem;
