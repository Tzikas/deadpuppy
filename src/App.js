import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Todo from './Todo';
import Loader from 'react-loader-spinner'



class App extends Component {

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
        setTimeout(() => this.setState({ loading: false }), 1500); 


        Object.assign(window, {
          getTasks,
          postTask,
          logIn,
          signUp,
          logOut,
          loggedIn,
          deleteTask,
          editTask    
        }); 
    }
    postTask = async (value) => {
        value.doneyet = false;
        let task = await postTask(value)
        this.setState({ tasks: [...this.state.tasks, task.data] })                
    }
    deleteTask = async (task) => {
        let t = await deleteTask(task)
        this.setState({tasks: this.state.tasks.filter(t => t._id !== task.id)})
    }
    editTask = async (newTask, val) => {
        console.log(newTask, val)
        
        let task = await editTask(newTask.id, {description:val, doneyet:newTask.doneyet})
        //this.setState({ tasks: [...this.state.tasks, task.data] })                
        console.log(task, newTask)

        const updatedTasks = this.state.tasks.map((obj, index) => {
          //return index === props.index ? props : obj;
          console.log(obj)
          if( obj._id !== task._id ){
            return obj 
          } else {
            obj.doneyet = !obj.doneyet
            return obj
          }
        });

        this.setState({tasks:updatedTasks})

        /*this.setState({tasks: this.state.tasks.filter(t => { 
            console.log(t, task)
            return t._id !== task._id
          }
          )})*/
    }

    logIn = async() => {
      let result = await logIn({ username:this.state.name, password:this.state.pass })
      //console.log(result)
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
      
      //this.setState({user: user, loggedIn:true})
      
    }

    signUp = async() => {
      //console.log(this.state)
      let result = await signUp({ username:this.state.name, password:this.state.pass })
      
      //console.log(result)

      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
    }

    logOut = async() => {
      await logOut()
      this.setState({loggedIn:false, user:null, name:'', pass:'' })      
    }
    loggedIn = async() => {
      let result = await loggedIn()
      result.error ? this.setState({status: result } ) :  this.setState({user: result, loggedIn:true, status:{ error:false, message:'' } }) 
      
     // this.setState({loggedIn:true, user:user})
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
              <div>Welcome {this.state.user.username} !</div>
              <button onClick={this.logOut}>LogOut</button>
              <Todo 
                tasks={this.state.tasks}
                postTask={this.postTask} 
                editTask={this.editTask} 
                deleteTask={this.deleteTask}
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


axios.defaults.withCredentials = true;  // :-/

const signUp = async (user) => axios.post('http://localhost:3000/api/signup',  user)
  .then(function (response) {
    return response.data    
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}    
      
  });

const logIn = async (user) => axios.post('http://localhost:3000/api/login',  user)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
    
  });

const logOut = async () => axios.post('http://localhost:3000/api/logOut')
  .then(function (response) {
    //console.log(response);
  })
  .catch(function (error) {
    //console.log(error);
  });
const loggedIn = async () => axios.get('http://localhost:3000/api/loggedin')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
    
   // return false
  });







const getTasks = async () => axios.get('http://localhost:3000/api/tasks')
  .then(function (response) {
    //console.log(response.data)
    return response.data
  })
  .catch(function (error) {
    //console.log(error);
  });


const postTask = async (task) => axios.post('http://localhost:3000/api/tasks/create',  task)
  .then(function (response) {
    ////console.log(response);
    return response;
  })
  .catch(function (error) {
    //console.log(error);
  });


const deleteTask = async (task) => axios.post(`http://localhost:3000/api/tasks/delete/${task.id}`)
  .then(function (response) {
    //console.log(response);
  })
  .catch(function (error) {
    //console.log(error);
  });


const editTask = async(id, task) => axios.post(`http://localhost:3000/api/tasks/edit/${id}`,  task)
  .then(function (response) {
    //console.log(response);
    return response.data;
    
  })
  .catch(function (error) {
    //console.log(error);
  });





//const logIn = async() => await fetch('http://localhost:3000/api/tasks').then(response => response.json());




export default App;
