import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';



class App extends Component {


  async componentDidMount() {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


axios.defaults.withCredentials = true;  // :-/

const signUp = async () => axios.post('http://localhost:3000/api/signup',  { username:'nikosaxios', password:'nikoniko' })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const logIn = async () => axios.post('http://localhost:3000/api/login',  { username:'nikosaxios', password:'nikoniko' })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const logOut = async () => axios.post('http://localhost:3000/api/logOut')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
const loggedIn = async () => axios.get('http://localhost:3000/api/loggedin')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });







const getTasks = async () => axios.get('http://localhost:3000/api/tasks')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


const postTask = async () => axios.post('http://localhost:3000/api/tasks/create',  { title:'a', description:'b', doneyet:false})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


const deleteTask = async () => axios.post(`http://localhost:3000/api/tasks/delete/${'5bb6f40729c4c824c1d5dcdd'}`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


const editTask = async () => axios.post(`http://localhost:3000/api/tasks/edit/${'5bb6f25729c4c824c1d5dcdc'}`,  { title:'d', description:Date.now(), doneyet:Math.random()})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });





//const logIn = async() => await fetch('http://localhost:3000/api/tasks').then(response => response.json());




export default App;
