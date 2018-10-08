import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
        }
    }
    /*
    handleEditTitle = () => {
        this.setState({
            isEdit: true
        })
    }

    handleSubmitTitle = () => {
        this.props.updateItem(
            this.props.token, 
            {
                _id: this.props.id,
                title: this.input.value.trim()
            }
        )

        this.setState({
            isEdit: false
        })
    }
    */

     edit = async (e) => {
        ////console.log('this id',e, this)
        
        //let b = await this.props.editTask(this.props.id)
        ////console.log('b', b)
        //this.setState({ tasks: [...this.state.tasks, b.data] })                

        this.setState({
            isEdit: !this.state.isEdit
        })
    }


    handleCheck = (e) => {
        //let val = this.input.value    
        console.log(this)
        console.log(this.props)
        let task = {
            id: this.props.id,
            description: this.props.title,
            doneyet : !this.props.doneyet
        }

        console.log(task)
        //task.doneyet = !task.doneyet
        this.props.editTask(task)


    }

    handleDelete = (e) => {
        this.props.deleteTask(this.props)
    }
    handleEdit = (e) => {
        let val = this.input.value
        //console.log(this.props, val)
        this.props.editTask(this.props, val)
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    renderTitle = () => {
    //console.log(this)
    
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
