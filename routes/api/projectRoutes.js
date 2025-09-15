const projectRouter = require('express').Router();
const Project = require('../../models/Project');
const authMiddleware = require('../../utils/auth'); 
const taskRoutes = require('./taskRoutes');

//to access these routes the user will need to pass authentication
projectRouter.use(authMiddleware);
//all routes will also include filtering by user's id to only show/edit user accessible posts
//router renamed as projectRouter to better comprehend which router is where

//creating a project with req.body and user's id
projectRouter.post('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const project = await Project.create({
            ...req.body,
            // The user ID needs to be added here
            user: req.user._id
        });
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//getting all projects of the user:id
projectRouter.get('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'You must be logged in to see this!' });
        }
        const projects = await Project.find({ user: req.user._id });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//getting a specific project of the user
projectRouter.get('/:id', async (req, res) => {
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
})

//changing a specific project of the user
projectRouter.put('/:id', async (req, res) => {
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
})

//deleting a specific project of the user
projectRouter.delete('/:id', async (req, res) => {
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
})

projectRouter.use('/:projectId', taskRoutes);

module.exports = projectRouter;