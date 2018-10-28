import React from 'react';
import Tasks from './Components/Tasks';
import CreateTask from './Components/CreateTask';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            errorGet: null,
            errorPost: null,
            tasks: [],
            newTask: null,
        }
        this.getAllTasks = this.getAllTasks.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentWillMount(){
        this.getAllTasks();
    }

    getAllTasks() {
        fetch("http://localhost:8080/tasks")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    tasks: result, 
                })
            },
            (errorGet) => {
                this.setState({
                    isLoaded: true,
                    errorGet,
                })
            }
        );
    }

    createNewTask(newTask) {
        if(newTask === null || newTask === '') {
            window.alert("Input cannot be empty");
        } else {
            fetch("http://localhost:8080/tasks", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: newTask
                }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.getAllTasks();
                },
                (errorPost) => {
                    this.setState({
                        errorPost
                    })
                }
            )
        }
    }

    deleteTask(taskId) {
        fetch("http://localhost:8080/tasks/" + taskId, {
            method: 'DELETE',
        })
        .then(
            (result) => {
                console.log(result);
                this.getAllTasks();
            },
            (errorDelete) => {
                window.alert("There was an error deleting this task");
            }
        )
    }

    handleOnSubmit(newTask) {
        this.createNewTask(newTask);
    }

    handleChange(event) {
        this.setState({
            newTask: event.target.value,
        })
    }

    handleDelete(taskId) {
        this.deleteTask(taskId);
    }

    render() {
        debugger;
        return (
            <div className="todo">
                <div className="todo-info jumbotron">
                    <center>
                        <h1>Todo Application</h1>
                    </center>
                </div>
                <div align="center" className="todo-create-task">
                    <CreateTask updateText={this.handleChange} submitTask={this.handleOnSubmit}/>
                </div> 
                <div align="center" className="todo-display-tasks">
                    <Tasks tasks={this.state.tasks} onDelete={this.handleDelete.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default TodoApp;