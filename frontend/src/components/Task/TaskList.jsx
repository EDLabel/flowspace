import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const groupedTasks = {
        todo: tasks.filter(task => task.status === 'todo'),
        in_progress: tasks.filter(task => task.status === 'in_progress'),
        review: tasks.filter(task => task.status === 'review'),
        done: tasks.filter(task => task.status === 'done')
    };

    const statusTitles = {
        todo: 'To Do',
        in_progress: 'In Progress',
        review: 'Review',
        done: 'Done'
    };

    return (
        <div className="task-list">
            <div className="task-columns">
                {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                    <div key={status} className="task-column">
                        <h3 className="column-title">
                            {statusTitles[status]} ({statusTasks.length})
                        </h3>
                        <div className="task-column-content">
                            {statusTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onUpdate={onUpdateTask}
                                    onDelete={onDeleteTask}
                                />
                            ))}
                            {statusTasks.length === 0 && (
                                <div className="empty-column">
                                    No tasks
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;