import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Todo from './Todo';
import Loader from 'react-loader-spinner'
import {
  signUp,
  logIn,
  logOut,
  loggedIn
} from './authActions'
import {
  getTasks,
  postTask,
  deleteTask,
  editTask
} from './todoActions'


export default class App extends Component {

    constructor() {
        super();
        this.state = { 
          tasks: [],
          loggedIn: false,
          loading: true,
          user: {},
          name: null,
          pass: null,
          status: { error:false, message:'' } 
        };
        //this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        let tasks =  await getTasks();
        this.setState({tasks:tasks})
        this.loggedIn()
        setTimeout(() => this.setState({ loading: false }), 1500); //Just to see the loading icon
    }
    postTask = async (value) => {
        value.doneyet = false;
        let task = await postTask(value)
        this.setState({ tasks: [...this.state.tasks, task] })                
    }
    deleteTask = async (task) => {
        let t = await deleteTask(task)
        this.setState({tasks: this.state.tasks.filter(t => t._id !== task.id)})
    }
    editTask = async (newTask, val) => {        
        let task = await editTask(newTask.id, {description:val, doneyet:newTask.doneyet})
        const updatedTasks = this.state.tasks.map((obj, index) => {
           if( obj._id !== task._id ){
            return obj 
          } else {
            obj.doneyet = newTask.doneyet
            if(val){
              obj.description = val;
            }
            return obj
          }
        });
        this.setState({tasks:updatedTasks})
    }
    myTasks = async() => {
        this.setState({tasks: this.state.tasks.filter(t => t.owner === this.state.user._id)})      
    }
    getTasks = async() => {
        let tasks =  await getTasks();
        this.setState({tasks:tasks})
        
    }
    logIn = async() => {
      let result = await logIn({ username:this.state.name, password:this.state.pass })
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } })    
    }

    signUp = async() => {
      let result = await signUp({ username:this.state.name, password:this.state.pass })
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
    }

    logOut = async() => {
      await logOut()
      this.setState({loggedIn:false, user:null, name:'', pass:'' })      
    }
    loggedIn = async() => {
      let result = await loggedIn()
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
      
    }


    render() {
       return (
        <div className="App">
            {this.state.loading ? 
            <div className='sweet-loading'>
              <Loader type="Plane" color="#00BFFF" height="100" width="100"/>         
            </div>
             : 
          <div className="App-content">
            {this.state.status.error ? <p> { this.state.status.message }</p> : ''}
            {this.state.loggedIn && !this.state.status.error ? 
              <span>
              <p id="user">Welcome {this.state.user.username} !</p>
              <button id="logout" onClick={this.logOut}>LogOut</button>
              <Todo 
                tasks={this.state.tasks}
                postTask={this.postTask} 
                editTask={this.editTask} 
                deleteTask={this.deleteTask}
                myTasks={this.myTasks}
                getTasks={this.getTasks}
                
              />
              </span>
            : <div>
                <p>Not logged in...</p>
                <div>
                  <input 
                    type="text"
                    ref={user => this.name = user}                  
                    onChange = {() =>  this.setState({name:this.name.value})}
                    />
                </div>
                <div>                  
                  <input 
                    type="password"                    
                    ref={pass => this.pass = pass}
                    onChange = {() => this.setState({pass:this.pass.value})}/>                                
                </div>
                  <button onClick ={this.logIn}>LogIn</button>
                  <button onClick ={this.signUp}>signUp</button> 

            </div> }
          </div>
          }
        </div>
      );
    }
  }


Object.assign(window, { //Lets actions be called from console 
  getTasks,
  postTask,
  logIn,
  signUp,
  logOut,
  loggedIn,
  deleteTask,
  editTask,
}); 


