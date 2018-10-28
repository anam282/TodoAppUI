import React from 'react';
import TaskItem from './TaskItem';
import './Tasks.css';

class Tasks extends React.Component {

    deleteTask(taskId){
        this.props.onDelete(taskId);
    }

    render() {
        const  { tasks } = this.props;
        if(tasks.length == 0) {
            return(<div>All done!!</div>);
        }
        return(
            <div>
                <div><h2>List of tasks</h2></div>
                <table className="table borderless">
                    <tbody>
                        <tr>
                            <th>Task No.</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        {tasks.map((task, index) => (
                            <TaskItem 
                                key={task.id} 
                                index={index+1} 
                                task={task}
                                onDelete={this.deleteTask.bind(this)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tasks;