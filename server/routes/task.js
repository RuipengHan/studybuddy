const mongoose = require('mongoose');
const Task = require('../models/Task.js');

module.exports = function (router) {

    // Create a new task
    router.post('/create', (req, res) => {
        const task = new Task(req.body);

        task.save((err, task) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(task);
        });
    });

    // Update a task
    router.put('/update/:id', (req, res) => {
    });

    // Get all tasks
    router.get('/all', (req, res) => {
        Task.find((err, tasks) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(tasks);
        });
    });

    // Get a task by id
    router.get('/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(task);
        });
    });

    // Get all tasks by user id
    router.get('/user/:id', (req, res) => {
        Task.find({ userId: req.params.id }, (err, tasks) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(tasks);
        });
    });

    // Get all tasks by time interval
    router.get('/date', (req, res) => {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        Task.find({ dueDate: { $gte: startDate, $lte: endDate } }, (err, tasks) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(tasks);
        });
    });

    // Delete a task by id
    router.delete('/delete/:id', (req, res) => {
        Task.findByIdAndRemove(req.params.id, (err, task) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json(task);
        });
    });

    return router;
};