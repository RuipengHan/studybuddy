module.exports = function (app, router) {
    // app.use('/api', require('./home.js')(router));
    // app.use('/api', require('./users.js')(router)); // Users API
    // app.use('/api', require('./tasks.js')(router)); // Task API

    // Authentication Routes
    const authRouter = require('./auth.js')(router);
    const taskRouter = require('./task.js')(router);
    app.use('/api/auth', authRouter);
    app.use('/api/task', taskRouter);
    // app.use('/api/protected-route', verifyToken, protectedRouteHandler);
};
