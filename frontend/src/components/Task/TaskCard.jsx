import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'priority-urgent';
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return 'priority-default';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'todo': return 'status-todo';
            case 'in_progress': return 'status-in-progress';
            case 'review': return 'status-review';
            case 'done': return 'status-done';
            default: return 'status-default';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString();
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await onUpdate(task.id, { status: newStatus });
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-actions">
                    <button
                        onClick={() => onUpdate(task.id, { priority: 'low' })}
                        className="action-btn"
                        title="Set Low Priority"
                    >
                        ⬇️
                    </button>
                    <button
                        onClick={() => onUpdate(task.id, { priority: 'high' })}
                        className="action-btn"
                        title="Set High Priority"
                    >
                        ⬆️
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="action-btn delete"
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="task-description">{task.description}</p>
            )}

            <div className="task-tags">
        <span className={`priority-tag ${getPriorityColor(task.priority)}`}>
          {task.priority} priority
        </span>
                <span className={`status-tag ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
            </div>

            <div className="task-footer">
                <div className="task-assignee">
                    {task.assigned_user_name ? (
                        <span>Assigned to: {task.assigned_user_name}</span>
                    ) : (
                        <span>Unassigned</span>
                    )}
                </div>
                <div className="task-due-date">
                    {task.due_date && (
                        <span>Due: {formatDate(task.due_date)}</span>
                    )}
                </div>
            </div>

            <div className="task-status-buttons">
                <button
                    onClick={() => handleStatusChange('todo')}
                    className={`status-btn ${task.status === 'todo' ? 'active' : ''}`}
                >
                    To Do
                </button>
                <button
                    onClick={() => handleStatusChange('in_progress')}
                    className={`status-btn ${task.status === 'in_progress' ? 'active' : ''}`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => handleStatusChange('done')}
                    className={`status-btn ${task.status === 'done' ? 'active' : ''}`}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default TaskCard;