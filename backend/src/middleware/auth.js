const JWT = require('../utils/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = JWT.extractTokenFromHeader(req.headers.authorization);
        const decoded = JWT.verifyToken(token);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;