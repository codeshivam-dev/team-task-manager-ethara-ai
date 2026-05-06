const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id] // creator automatically member ho jayega
    });
    
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    let projects;
    
    if (req.user.role === 'admin') {
      // admin can sees all projects
      projects = await Project.find().populate('createdBy', 'name email').populate('members', 'name email');
    } else {
      // member sees only projects they're part of
      projects = await Project.find({ members: req.user.id }).populate('createdBy', 'name email').populate('members', 'name email');
    }
    
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('members', 'name email');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // check access
    if (req.user.role !== 'admin' && !project.members.some(m => m._id.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // get tasks for this project
    const tasks = await Task.find({ projectId: project._id })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    
    res.json({ project, tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    const populatedProject = await Project.findById(project._id)
      .populate('createdBy', 'name email')
      .populate('members', 'name email');

    res.json({ message: 'Member added successfully', project: populatedProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // delete all tasks in this project
    await Task.deleteMany({ projectId: project._id });
    await project.deleteOne();
    
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, addMember, deleteProject };