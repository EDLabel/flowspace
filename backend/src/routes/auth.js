const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected routes
router.get('/profile', authMiddleware, AuthController.getProfile);

// Test protected route
router.get('/test', authMiddleware, (req, res) => {
    res.json({
        message: 'Access granted to protected route',
        user: req.user
    });
});

module.exports = router;