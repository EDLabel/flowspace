const User = require('../models/User');
const JWT = require('../utils/jwt');
const { registerSchema, loginSchema } = require('../utils/validation');

class AuthController {
    static async register(req, res) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { email, password, name, skills } = value;

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ error: 'User already exists with this email' });
            }

            const user = await User.create({ email, password, name, skills });
            const token = JWT.generateToken({ userId: user.id });

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    skills: user.skills ? JSON.parse(user.skills) : []
                },
                token
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async login(req, res) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { email, password } = value;

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isValidPassword = await User.verifyPassword(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = JWT.generateToken({ userId: user.id });

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    skills: user.skills ? JSON.parse(user.skills) : []
                },
                token
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProfile(req, res) {
        try {
            res.json({
                user: {
                    id: req.user.id,
                    email: req.user.email,
                    name: req.user.name,
                    skills: req.user.skills ? JSON.parse(req.user.skills) : [],
                    created_at: req.user.created_at
                }
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AuthController;