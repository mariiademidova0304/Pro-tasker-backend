const router = require('express').Router({ mergeParams: true });
const { trusted } = require('mongoose');
const authMiddleware = require('../../utils/auth');
const { createTask, getTasks, updateTask, deleteTask } = require('../../controllers/taskController');

//follows route /api/projects/:projectId/tasks
//doesn't need middleware since parent already has it
router.post('/tasks', createTask);

//follows route /api/projects/:projectId/tasks
//doesn't need middleware since parent already has it
router.get('/tasks', getTasks);

//follows route /api/tasks/:taskId
//needs auth middleware since there's no parent that runs it
router.put('/:taskId', authMiddleware, updateTask);

//follows route /api/tasks/:taskId
//needs auth middleware since there's no parent that runs it
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;