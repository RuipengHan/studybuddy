const express = require('express');
const User = require('../models/User');

module.exports = function(router) {

    // User registration
    router.post('/register', async (req, res) => {
        try {
            console.log("---------------- POST /api/auth/register ---------------------")
            // Destructure and validate required fields from the request body
            const { firstName, lastName, username, email, password } = req.body;
            if (!firstName || !lastName || !username || !email || !password) {
                return res.status(400).json({ message: 'Please enter all required fields' });
            }
    
            // Check for existing user by username or email
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
    
            // Create and save the new user
            const newUser = new User({ firstName, lastName, username, email, password });
            await newUser.save();
    
            // Respond with success message (or token if implementing JWT)
            res.status(201).json({ message: 'User registered successfully', user: newUser });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server error' });
        }
    });

    // User login
    router.post('/login', async (req, res) => {
        // Implement user login logic
    });

    return router;
};
