import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
    baseURL: API_BASE,
})

// FIX: Always attach token if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log('API Request - Token exists:', !!token) // Debug log
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Rest of the code remains the same...
export default {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile'),
    getProjects: () => api.get('/projects'),
    createProject: (projectData) => api.post('/projects', projectData),
}