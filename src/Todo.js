import React, { Component } from 'react';
import './todo.css';
//import { REACT_UNIVERSAL_REPO_URL } from '../../config';

import TodoItem from './TodoItem';

class Todo extends Component {
    
    async componentDidMount() {
        let tasks =  await this.props.getTasks();
        console.log(tasks)
        this.setState({tasks:tasks})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let a = await this.props.postTask({description:Date.now()})
        this.setState({ tasks: [...this.state.tasks, a.data] })                
        //this.input.value = ''
    }


    render() {
        console.log(this)
        let items = [];
        if(this.state){           
            items = this.state.tasks.map(item => (
                <div key={item._id}>
                    <TodoItem id={item._id} title={item.description}  completed={item.completed} editTask={this.props.editTask}/>
                </div>
            ))
        }

        return (
            <div>
                <h1 class="site-header">Todos</h1>
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
                        {/*this.renderTodos()*/}
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
