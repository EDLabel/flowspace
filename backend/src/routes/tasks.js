const express = require('express');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', TaskController.createTask);
router.get('/project/:projectId', TaskController.getTasksByProject);
router.patch('/:taskId', TaskController.updateTask);
router.delete('/:taskId', TaskController.deleteTask);

module.exports = router;