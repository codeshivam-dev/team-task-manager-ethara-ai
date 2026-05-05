const express = require('express');
const router = express.Router();
const { 
    createTask, 
    updateTaskStatus, 
    deleteTask, 
    getTasksByProject, 
    getDashboard 
} = require('../controllers/taskController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/project/:projectId', auth, createTask);
router.patch('/:taskId/status', auth, updateTaskStatus);
router.delete('/:taskId', auth, roleCheck('admin'), deleteTask);
router.get('/project/:projectId', auth, getTasksByProject);
router.get('/dashboard', auth, getDashboard);

module.exports = router;