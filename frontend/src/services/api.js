import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
    baseURL: API_BASE,
})

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

export default {
    // Auth
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile'),

    // Projects
    getProjects: () => api.get('/projects'),
    createProject: (projectData) => api.post('/projects', projectData),
    getProject: (projectId) => api.get(`/projects/${projectId}`),

    // NEW: Tasks
    getTasks: (projectId) => api.get(`/tasks/project/${projectId}`),
    createTask: (taskData) => api.post('/tasks', taskData),
    updateTask: (taskId, updates) => api.patch(`/tasks/${taskId}`, updates),
    deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
}