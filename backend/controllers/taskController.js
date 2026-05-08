const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo } = req.body;
    const { projectId } = req.params;
    
    // check if project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // check if user is project member or admin
    const isMember = project.members.includes(req.user.id);
    if (req.user.role !== 'admin' && !isMember) {
      return res.status(403).json({ message: 'You cannot add tasks to this project' });
    }
    
    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo: assignedTo || null,
      projectId,
      createdBy: req.user.id
    });
    
    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');
    
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // check if user is assigned to task or admin or project creator
    const project = await Project.findById(task.projectId);
    const canUpdate = req.user.role === 'admin' || 
                      task.assignedTo?.toString() === req.user.id ||
                      project.createdBy.toString() === req.user.id;
    
    if (!canUpdate) {
      return res.status(403).json({ message: 'You cannot update this task' });
    }
    console.log("Updated")
    task.status = status;
    await task.save();
    
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    let tasks;
    
    if (req.user.role === 'admin') {
      // admin sees all tasks
      tasks = await Task.find()
        .populate('assignedTo', 'name email')
        .populate('projectId', 'name');
    } else {
      // member sees tasks assigned to them OR tasks from projects they're in
      const projects = await Project.find({ members: req.user.id });
      const projectIds = projects.map(p => p._id);
      
      tasks = await Task.find({
        $or: [
          { assignedTo: req.user.id },
          { projectId: { $in: projectIds } }
        ]
      }).populate('assignedTo', 'name email')
        .populate('projectId', 'name');
    }
    
    const today = new Date();
    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      doing: tasks.filter(t => t.status === 'doing').length,
      done: tasks.filter(t => t.status === 'done').length,
      overdue: tasks.filter(t => t.dueDate < today && t.status !== 'done').length
    };
    
    const recentTasks = tasks.sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
    const overdueTasks = tasks.filter(t => t.dueDate < today && t.status !== 'done');
    
    res.json({ stats, recentTasks, overdueTasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, updateTaskStatus, deleteTask, getTasksByProject, getDashboard };