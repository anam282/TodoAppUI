import React from 'react';

class TaskItem extends React.Component {
    
    deleteTask(taskId) {
        this.props.onDelete(taskId);
    }

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.task.description}</td>
                <td><button
                        className="btn" 
                        type="submit" 
                        value="Delete" 
                        onClick={this.deleteTask.bind(this, this.props.task.id)}
                    >X</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;