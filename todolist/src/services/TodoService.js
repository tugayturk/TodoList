import {env} from "../env/EnvironmentConfig"

const serviceUrl = `${env.API_BASE_SERVICE_URL}/todos`

class TodoService{
    get(){
        return fetch(`${serviceUrl}`)
    }
    createTodo(data){
        return fetch(`${serviceUrl}`,
        { method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)})
    }
    editTodo(data){
        return fetch(`${serviceUrl}/${data.id}`,
        { method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)})
    }
    deleteTodo(id){
        return fetch(`${serviceUrl}/${id}`,{
            method:"DELETE",
            mode: 'cors', 
        })
    }
}

export default new TodoService()