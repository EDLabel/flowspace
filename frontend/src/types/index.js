// Types for our application
export interface User {
    id: string;
    email: string;
    name: string;
    skills: string[];
    created_at: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
    role: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    due_date: string;
    project_id: string;
    assigned_to: string;
    assigned_user_name: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: Task['status'];
    priority?: Task['priority'];
    due_date?: string;
    project_id: string;
    assigned_to?: string;
}