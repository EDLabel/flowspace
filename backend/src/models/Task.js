const { run, query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Task {
    static async create(taskData) {
        const { title, description, status, priority, due_date, project_id, assigned_to, created_by } = taskData;

        const id = uuidv4();
        const now = new Date().toISOString();

        await run(
            `INSERT INTO tasks (id, title, description, status, priority, due_date, project_id, assigned_to, created_by, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, title, description, status, priority, due_date, project_id, assigned_to, created_by, now, now]
        );

        return this.findById(id);
    }

    static async findById(id) {
        const tasks = await query(
            `SELECT t.*, u.name as assigned_user_name 
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.id = ?`,
            [id]
        );
        return tasks[0] || null;
    }

    static async findByProject(projectId) {
        const tasks = await query(
            `SELECT t.*, u.name as assigned_user_name 
       FROM tasks t
       LEFT JOIN users u ON t.assigned_to = u.id
       WHERE t.project_id = ?
       ORDER BY 
         CASE priority
           WHEN 'high' THEN 1
           WHEN 'medium' THEN 2
           WHEN 'low' THEN 3
           ELSE 4
         END,
         t.created_at DESC`,
            [projectId]
        );
        return tasks;
    }

    static async update(id, updates) {
        const allowedFields = ['title', 'description', 'status', 'priority', 'due_date', 'assigned_to'];
        const setClause = [];
        const values = [];

        for (const [field, value] of Object.entries(updates)) {
            if (allowedFields.includes(field)) {
                setClause.push(`${field} = ?`);
                values.push(value);
            }
        }

        if (setClause.length === 0) {
            return this.findById(id);
        }

        setClause.push('updated_at = ?');
        values.push(new Date().toISOString());
        values.push(id);

        await run(
            `UPDATE tasks SET ${setClause.join(', ')} WHERE id = ?`,
            values
        );

        return this.findById(id);
    }

    static async delete(id) {
        await run('DELETE FROM tasks WHERE id = ?', [id]);
    }
}

module.exports = Task;