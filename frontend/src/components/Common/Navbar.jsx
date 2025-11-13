import React from 'react'

const Navbar = ({ user, onLogout }) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand">
                    FlowSpace
                </div>

                <div className="navbar-user">
                    <div className="user-info">
                        <div className="user-avatar">
                            {getInitials(user.name)}
                        </div>
                        <span>{user.name}</span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

// Change this to default export
export default Navbar