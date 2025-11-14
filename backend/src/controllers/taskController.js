const Task = require('../models/Task');

class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description, status, priority, due_date, project_id, assigned_to } = req.body;

            // Validate required fields
            if (!title || !project_id) {
                return res.status(400).json({ error: 'Title and project ID are required' });
            }

            const taskData = {
                title,
                description: description || '',
                status: status || 'todo',
                priority: priority || 'medium',
                due_date,
                project_id,
                assigned_to,
                created_by: req.user.id
            };

            const task = await Task.create(taskData);

            res.status(201).json({
                message: 'Task created successfully',
                task
            });
        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getTasksByProject(req, res) {
        try {
            const { projectId } = req.params;

            const tasks = await Task.findByProject(projectId);

            res.json({ tasks });
        } catch (error) {
            console.error('Get tasks error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const updates = req.body;

            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            const updatedTask = await Task.update(taskId, updates);

            res.json({
                message: 'Task updated successfully',
                task: updatedTask
            });
        } catch (error) {
            console.error('Update task error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params;

            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }

            await Task.delete(taskId);

            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Delete task error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = TaskController;