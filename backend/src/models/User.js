const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { run, query } = require('../config/database');

class User {
    static async create(userData) {
        const { email, password, name, skills = [] } = userData;

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const id = uuidv4();
        const now = new Date().toISOString();

        await run(
            `INSERT INTO users (id, email, password_hash, name, skills, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, email, passwordHash, name, JSON.stringify(skills), now, now]
        );

        return this.findById(id);
    }

    static async findById(id) {
        const users = await query(
            'SELECT id, email, name, skills, created_at, updated_at FROM users WHERE id = ?',
            [id]
        );
        return users[0] || null;
    }

    static async findByEmail(email) {
        const users = await query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return users[0] || null;
    }

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = User;