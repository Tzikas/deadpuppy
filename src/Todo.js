import React, { Component } from 'react';
import './todo.css';
import axios from 'axios'

import TodoItem from './TodoItem';

class Todo extends Component {

    handleSubmit = async (e) => {        
        e.preventDefault();
        let value = this.input.value;
        this.props.postTask({description:value})
        this.input.value = ''     
    }
    
    render() {
        //console.log(this.props)    
        let items = this.props.tasks.map(item => (
                <div key={item._id}>
                    <TodoItem key={item._id} id={item._id} title={item.description}  doneyet={item.doneyet} editTask={this.props.editTask} deleteTask={this.props.deleteTask}/>
                </div>
        ))

        return (
            <div>
                <h1 className="site-header">Todos</h1>
                <p className="app-description">
                    sup
                </p>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                id="input-title"
                                className="input-title"
                                type="text"
                                autoComplete="off"
                                ref={input => {this.input = input}}
                                placeholder="Add a todo..."/>
                        </div>
                    </form>
                    <div className="todo-container">
                        {items}
                    </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

export default Todo;
