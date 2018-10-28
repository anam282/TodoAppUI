import React from 'react';

class CreateTask extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    handleChange(event) {
        this.setState({
            newTask: event.target.value
        });
    }

    submitTask() {
        this.props.submitTask(this.state.newTask);
    }
    
    render() {
        return(
            <form onSubmit={this.submitTask}>
                <div className="form-group">
                    <label>New Task:
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.newTask}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        );
    }
}

export default CreateTask;