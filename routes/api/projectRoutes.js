const projectRouter = require('express').Router();
const authMiddleware = require('../../utils/auth'); 
const taskRoutes = require('./taskRoutes');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../../controllers/projectController');

//to access these routes the user will need to pass authentication
projectRouter.use(authMiddleware);
//all routes will also include filtering by user's id to only show/edit user accessible posts
//router renamed as projectRouter to better comprehend which router is where

//creating a project with req.body and user's id
projectRouter.post('/', createProject)

//getting all projects of the user:id
projectRouter.get('/', getAllProjects)

//getting a specific project of the user
projectRouter.get('/:id', getProjectById)

//changing a specific project of the user
projectRouter.put('/:id', updateProject)

//deleting a specific project of the user
projectRouter.delete('/:id', deleteProject)

projectRouter.use('/:projectId', taskRoutes);

module.exports = projectRouter;