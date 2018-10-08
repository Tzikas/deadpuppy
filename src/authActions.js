import axios from 'axios'
axios.defaults.withCredentials = true;  // :-/

export const signUp = async (user) => axios.post('http://localhost:3000/api/signup',  user)
  .then(function (response) {
    return response.data    
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}    
      
  });

export const logIn = async (user) => axios.post('http://localhost:3000/api/login',  user)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
    
  });

export const logOut = async () => axios.post('http://localhost:3000/api/logOut')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
  });
export const loggedIn = async () => axios.get('http://localhost:3000/api/loggedin')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
});



