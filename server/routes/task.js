const express = require('express');
const Task = require('../models/Task');
const verifyToken = require('../middleware/verifyToken')
module.exports = function(router) {
    // create a new task
    router.post('/', verifyToken, async (req, res) => {
        try{
            const taskData = {
                ...req.body,
                username: req.user.username
            };
            const task = new Task(taskData);
            await task.save();
            res.status(201).send({ message: 'Task created successfully', task: task });
        }
        catch(error){
            console.error(error);
            res.status(500).send({ message: 'Error creating task', error: error.message });
        }
    })
    // get all tasks with a time range
    // if range is not specified, return all tasks
    router.get('/', verifyToken, async (req, res) => {
        try{
            const { startDate, endDate } = req.query;
            const query = {
                username: req.user.username
            };
            if(startDate && endDate){
                query.creationDate = {
                    $gte: startDate,
                    $lte: endDate
                };
            }
            const tasks = await Task.find(query);
            
            res.status(200).send({ message: 'Tasks retrieved successfully', tasks: tasks });
        }
        catch(error){
            console.error(error);
            res.status(500).send({ message: 'Error retrieving tasks', error: error.message });
        }
    })
    
    // get a list of tasks within a start and end date.
    router.get('/within_dates', verifyToken, async (req, res) => {
        try {
            // Retrieve dates from query parameters
            const { startDate, endDate } = req.query;
    
            // Validate the dates
            if (!startDate || !endDate) {
                return res.status(400).send({ message: 'Both startDate and endDate are required.' });
            }
    
            // Convert dates to appropriate format if necessary
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            // Fetch tasks within the date range
            const tasks = await Task.find({
                creationDate: { $gte: start, $lte: end },
                username: req.user.username // Assuming tasks are user-specific
            });
    
            res.status(200).send(tasks);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching tasks' });
        }
    });


    // get a single task by id
    router.get('/:id', verifyToken, async (req, res) => {
        try{
            const task = await Task.findById(req.params.id);
            if(!task){
                return res.status(404).send({ message: 'Task not found' });
            }
            res.status(200).send({ message: 'Task retrieved successfully', task: task });
        }
        catch(error){
            console.error(error);
            res.status(500).send({ message: 'Error retrieving task', error: error.message });
        }
    })

    // update a task
    router.put('/:id', verifyToken, async (req, res) => {
        try{
            const task = await Task.findById(req.params.id);
            if(!task){
                return res.status(404).send({ message: 'Task not found' });
            }
            if(task.username !== req.user.username){
                return res.status(401).send({ message: 'Not authorized to update this task' });
            }
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send({ message: 'Task updated successfully', task: updatedTask });
        }
        catch(error){
            console.error(error);
            res.status(500).send({ message: 'Error updating task', error: error.message });
        }
    })


    
    return router;
};