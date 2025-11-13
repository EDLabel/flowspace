import React, { useState } from 'react'
import api from '../../services/api'

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        skills: []
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.register(formData)
            onRegister(response.data.user, response.data.token)
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                />
            </div>

            <button
                type="submit"
                className="btn-primary"
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    )
}

export default Register