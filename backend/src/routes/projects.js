const express = require('express');
const ProjectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getProjects);
router.get('/:projectId', ProjectController.getProject);

module.exports = router;