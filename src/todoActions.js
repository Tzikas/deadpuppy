import axios from 'axios'
axios.defaults.withCredentials = true;  // :-/

export const getTasks = async () => axios.get('http://localhost:3000/api/tasks')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
  });


export const postTask = async (task) => axios.post('http://localhost:3000/api/tasks/create',  task)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
  });


export const deleteTask = async (task) => axios.post(`http://localhost:3000/api/tasks/delete/${task.id}`)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}

  });


export const editTask = async(id, task) => axios.post(`http://localhost:3000/api/tasks/edit/${id}`,  task)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return {error:true, message: error.response.data.message}
  });




