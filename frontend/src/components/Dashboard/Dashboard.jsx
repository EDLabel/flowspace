import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const response = await api.getProjects();
            setProjects(response.data.projects);
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    };

    const handleCreateProject = async () => {
        const name = prompt('Project name:');
        const description = prompt('Project description:');

        if (name) {
            try {
                await api.createProject({ name, description });
                loadProjects();
            } catch (error) {
                alert('Failed to create project: ' + error.response?.data?.error);
            }
        }
    };

    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome to FlowSpace!</h1>
                <p className="dashboard-subtitle">
                    Manage your projects efficiently with AI assistance
                </p>
            </div>

            <div className="projects-section">
                <div className="projects-header">
                    <h2 className="projects-title">Your Projects</h2>
                    <button
                        className="btn-primary"
                        onClick={handleCreateProject}
                    >
                        + New Project
                    </button>
                </div>

                <div className="projects-grid">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="project-card clickable"
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <h3 className="project-card-title">{project.name}</h3>
                            <p className="project-card-description">
                                {project.description || 'No description'}
                            </p>
                            <div className="project-card-meta">
                                <span className="project-card-role">{project.role}</span>
                                <span className="project-card-date">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="empty-projects">
                            <p className="empty-projects-message">
                                No projects yet. Create your first project!
                            </p>
                            <button
                                className="btn-primary"
                                onClick={handleCreateProject}
                            >
                                Create First Project
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;