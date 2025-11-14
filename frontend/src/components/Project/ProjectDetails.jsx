import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from '../Task/TaskList';
import CreateTaskForm from '../Task/CreateTaskForm';
import api from '../../services/api';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProjectAndTasks();
    }, [projectId]);

    const loadProjectAndTasks = async () => {
        try {
            setLoading(true);
            const [projectResponse, tasksResponse] = await Promise.all([
                api.getProject(projectId),
                api.getTasks(projectId)
            ]);

            setProject(projectResponse.data.project);
            setTasks(tasksResponse.data.tasks);
        } catch (error) {
            console.error('Failed to load project:', error);
            setError('Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await api.createTask(taskData);
            setShowCreateTask(false);
            loadProjectAndTasks();
        } catch (error) {
            console.error('Failed to create task:', error);
            alert('Failed to create task: ' + error.response?.data?.error);
        }
    };

    const handleUpdateTask = async (taskId, updates) => {
        try {
            await api.updateTask(taskId, updates);
            loadProjectAndTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await api.deleteTask(taskId);
            loadProjectAndTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Failed to delete task: ' + error.response?.data?.error);
        }
    };

    if (loading) {
        return (
            <div className="project-details-container">
                <div className="loading">Loading project...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="project-details-container">
                <div className="error-message">{error}</div>
                <button
                    onClick={() => navigate('/')}
                    className="btn-primary"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-details-container">
                <div className="error-message">Project not found</div>
                <button
                    onClick={() => navigate('/')}
                    className="btn-primary"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="project-details-container">
            {/* Header */}
            <div className="project-header">
                <button
                    onClick={() => navigate('/')}
                    className="back-button"
                >
                    ← Back to Projects
                </button>

                <div className="project-header-content">
                    <div className="project-info">
                        <h1 className="project-title">{project.name}</h1>
                        {project.description && (
                            <p className="project-description">{project.description}</p>
                        )}
                        <div className="project-meta">
                            <span className="project-role">{project.role}</span>
                            <span className="project-date">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowCreateTask(!showCreateTask)}
                        className="btn-primary new-task-btn"
                    >
                        {showCreateTask ? 'Cancel' : '+ New Task'}
                    </button>
                </div>
            </div>

            {/* Create Task Form */}
            {showCreateTask && (
                <div className="create-task-section">
                    <CreateTaskForm
                        projectId={projectId}
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowCreateTask(false)}
                    />
                </div>
            )}

            {/* Tasks Section */}
            <div className="tasks-section">
                <div className="tasks-header">
                    <h2 className="tasks-title">
                        Tasks ({tasks.length})
                    </h2>
                </div>

                {tasks.length > 0 ? (
                    <TaskList
                        tasks={tasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                    />
                ) : (
                    <div className="empty-tasks">
                        <div className="empty-tasks-message">
                            No tasks yet. Create your first task to get started!
                        </div>
                        <button
                            onClick={() => setShowCreateTask(true)}
                            className="btn-primary"
                        >
                            Create First Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;