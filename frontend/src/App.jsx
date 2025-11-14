import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Common/Navbar';
import ProjectDetails from './components/Project/ProjectDetails';
import Dashboard from './components/Dashboard/Dashboard';
import api from './services/api';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.getProfile()
                .then(response => {
                    setUser(response.data.user);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogin = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <Router>
            <div className="app min-h-screen bg-gray-50">
                {user && <Navbar user={user} onLogout={handleLogout} />}

                <Routes>
                    {/* Public routes */}
                    {!user ? (
                        <>
                            <Route path="/login" element={
                                <AuthPage
                                    showLogin={true}
                                    onAuth={handleLogin}
                                />
                            } />
                            <Route path="/register" element={
                                <AuthPage
                                    showLogin={false}
                                    onAuth={handleLogin}
                                />
                            } />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    ) : (
                        /* Protected routes */
                        <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/project/:projectId" element={<ProjectDetails />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

// Auth page component for login/register
function AuthPage({ showLogin, onAuth }) {
    const [isLogin, setIsLogin] = useState(showLogin);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>FlowSpace</h1>
                <p>AI-Powered Project Management</p>

                {isLogin ? (
                    <Login onLogin={onAuth} />
                ) : (
                    <Register onRegister={onAuth} />
                )}

                <button
                    className="switch-mode"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                </button>
            </div>
        </div>
    );
}

export default App;