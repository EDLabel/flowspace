import React, { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Common/Navbar'
import api from './services/api'
import './App.css'

function App() {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(true)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.getProfile()
                .then(response => {
                    setUser(response.data.user)
                    loadProjects()
                })
                .catch(() => {
                    localStorage.removeItem('token')
                })
        }
    }, [])

    const loadProjects = async () => {
        try {
            const response = await api.getProjects()
            setProjects(response.data.projects)
        } catch (error) {
            console.error('Failed to load projects:', error)
        }
    }

    const handleLogin = (userData, token) => {
        setUser(userData)
        localStorage.setItem('token', token)
        loadProjects()
    }

    const handleLogout = () => {
        setUser(null)
        setProjects([])
        localStorage.removeItem('token')
    }

    const handleCreateProject = async (projectData) => {
        try {
            await api.createProject(projectData)
            loadProjects()
        } catch (error) {
            alert('Failed to create project: ' + error.response?.data?.error)
        }
    }

    if (!user) {
        return (
            <div className="app">
                <div className="auth-container">
                    <div className="auth-card">
                        <h1>FlowSpace</h1>
                        <p>AI-Powered Project Management</p>

                        {showLogin ? (
                            <Login onLogin={handleLogin} />
                        ) : (
                            <Register onRegister={handleLogin} />
                        )}

                        <button
                            className="switch-mode"
                            onClick={() => setShowLogin(!showLogin)}
                        >
                            {showLogin ? 'Need an account? Register' : 'Have an account? Login'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            <Navbar user={user} onLogout={handleLogout} />

            <div className="container">
                <div className="header">
                    <h1>Welcome, {user.name}!</h1>
                    <p>Manage your projects efficiently with AI assistance</p>
                </div>

                <div className="projects-section">
                    <div className="projects-header">
                        <h2>Your Projects</h2>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                const name = prompt('Project name:')
                                const description = prompt('Project description:')
                                if (name) {
                                    handleCreateProject({ name, description })
                                }
                            }}
                        >
                            + New Project
                        </button>
                    </div>

                    <div className="projects-grid">
                        {projects.map(project => (
                            <div key={project.id} className="project-card">
                                <h3>{project.name}</h3>
                                <p>{project.description || 'No description'}</p>
                                <div className="project-meta">
                                    <span className="role">{project.role}</span>
                                    <span className="date">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="empty-state">
                                <p>No projects yet. Create your first project!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App