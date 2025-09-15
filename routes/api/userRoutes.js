const userRouter = require('express').Router();
const { registerUser, loginUser } = require('../../controllers/userController');

//renamed the router as userrouter to keep track of routers because of having a child router
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

module.exports = userRouter;