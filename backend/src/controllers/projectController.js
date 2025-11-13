const { run, query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { projectSchema } = require('../utils/validation');

class ProjectController {
    static async createProject(req, res) {
        try {
            const { error, value } = projectSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { name, description } = value;
            const id = uuidv4();
            const now = new Date().toISOString();

            await run(
                `INSERT INTO projects (id, name, description, owner_id, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?)`,
                [id, name, description, req.user.id, now, now]
            );

            // Add owner as project member
            await run(
                `INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)`,
                [id, req.user.id, 'owner']
            );

            const project = await query(
                'SELECT * FROM projects WHERE id = ?',
                [id]
            );

            res.status(201).json({
                message: 'Project created successfully',
                project: project[0]
            });
        } catch (error) {
            console.error('Create project error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProjects(req, res) {
        try {
            const projects = await query(`
        SELECT p.*, pm.role 
        FROM projects p
        JOIN project_members pm ON p.id = pm.project_id
        WHERE pm.user_id = ?
        ORDER BY p.created_at DESC
      `, [req.user.id]);

            res.json({ projects });
        } catch (error) {
            console.error('Get projects error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProject(req, res) {
        try {
            const { projectId } = req.params;

            const projects = await query(`
        SELECT p.*, pm.role 
        FROM projects p
        JOIN project_members pm ON p.id = pm.project_id
        WHERE p.id = ? AND pm.user_id = ?
      `, [projectId, req.user.id]);

            if (projects.length === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }

            res.json({ project: projects[0] });
        } catch (error) {
            console.error('Get project error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = ProjectController;