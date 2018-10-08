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
        let items = this.props.tasks.map(item => (
                <div key={item._id}>
                    <TodoItem 
                        key={item._id} 
                        id={item._id} 
                        title={item.description}  
                        doneyet={item.doneyet} 
                        editTask={this.props.editTask} 
                        deleteTask={this.props.deleteTask}/>
                </div>
        ))

        return (
            <div>
                <h1 className="site-header">Todos</h1>
                <div className="row">
                    <div>
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
              <br />
              <br />
              <button onClick ={this.props.myTasks}>My Tasks</button> 
              <button onClick ={this.props.getTasks}>All Tasks</button> 
                <p className="app-description">
                    Double click to Edit.  
                </p>

                    <div className="todo-container">
                        {items}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo;
