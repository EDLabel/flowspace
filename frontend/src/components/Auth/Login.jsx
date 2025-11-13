import React, { useState } from 'react'
import api from '../../services/api'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const response = await api.login(formData)
            onLogin(response.data.user, response.data.token)
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                />
            </div>

            <button
                type="submit"
                className="btn-primary"
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    )
}

export default Login