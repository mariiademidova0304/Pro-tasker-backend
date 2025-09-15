const Project = require('../models/Project');

const createProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const project = await Project.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getAllProjects = async (req, res) => {
     try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const projects = await Project.find({ user: req.user._id });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getProjectById = async (req,res) => {
     try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let project = await Project.findOne({ _id: req.params.id, user: req.user._id });
        if (!project) {
            return res.status(404).json({ message: 'No project found with this id!' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const updateProject = async (req,res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        let project = await Project.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'No project found with this id!' });
        }
        return res.json(project);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const deleteProject = async (req,res) => {
     try {
        if (!req.user) {
            res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!project) {
            return res.status(404).json({ message: 'No project found with this id!' });
        }
        return res.status(200).json({ message: 'Project successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };