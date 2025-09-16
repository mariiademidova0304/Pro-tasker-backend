const Project = require('../models/Project');
const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'No project found with this id!' });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to edit this project' });
        }
        const task = await Task.create({
            ...req.body,
            project: project._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'No project found with this id!' });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to access this project' });
        }
        const tasks = await Task.find({ project: project._id })
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'No task found with this id!' });
        }
        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'No task found with this id!' });
        }
        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        task = await Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'No task found with this id!' });
        }
        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to edit this task' });
        }
        task = await Task.findOneAndDelete({ _id: req.params.taskId });
        res.status(200).json({ message: 'Task deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };