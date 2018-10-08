import axios from 'axios'
import {serverURL} from './config'
console.log(serverURL)


axios.defaults.withCredentials = true;  // :-/

export const signUp = async (user) => axios.post(`${serverURL}/api/signup`,  user)
  .then(function (response) {
    return response.data    
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}    
      
  });

export const logIn = async (user) => axios.post(`${serverURL}/api/login`,  user)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
    
  });

export const logOut = async () => axios.post(`${serverURL}/api/logOut`)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
  });
export const loggedIn = async () => axios.get(`${serverURL}/api/loggedin`)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
});



