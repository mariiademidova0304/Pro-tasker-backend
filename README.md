# Project Structure

config/
    connection.js - set up mongodb connection
models/
    User.js 
    Project.js - has a reference to the user with Schema.Types.ObjectId
    Task.js - has a reference to the project with Schema.Types.ObjectId
routes/
    index.js - routes to apiRoutes
    api/
        index.js - has the routes to different routers
        userRoutes.js - 
        projectRoutes.js - needs auth middleware on all routes
        taskRoutes.js - needs auth middleware partially, as some routes are children to projectRoutes
utils/
    auth.js - middleware to authenticate user
server.js 

# Description

This is a backend service for a product called Task Master. It's supposed to power user accounts, project management and task management.

Dependencies needed installed: express, mongoose, bcrypt, jsonwebtoken, dotenv

Project has 3 models - User, Project and Task. Their are linked by reference: Project to User and Task to Project.

Routes for Projects and Tasks follow CRUD scheme.

Task routes are partially nested routes, 2 of them belong to Project routes, while the other 2 can be accessible without.

User register and login is currently only available with user's own credentials.
