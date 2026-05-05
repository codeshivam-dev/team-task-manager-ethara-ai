const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, addMember, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('admin'), createProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProjectById);
router.post('/:id/members', auth, roleCheck('admin'), addMember);
router.delete('/:id', auth, roleCheck('admin'), deleteProject);

module.exports = router;