import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">FlowSpace</Link>
                </div>

                <div className="navbar-user">
                    <div className="user-info">
                        <div className="user-avatar">
                            {getInitials(user.name)}
                        </div>
                        <span className="user-name">{user.name}</span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;