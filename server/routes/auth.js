const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var secrets = require('../config/config');
const verifyToken = require('../middleware/verifyToken');

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

            // After the user is successfully created
            const token = jwt.sign(
                { id: newUser._id, firstName: newUser.firstName },
                secrets.jwt_secrets,
                { expiresIn: '1h' } // Token expiration time
            );
            
            // Respond with success message (or token if implementing JWT)
            res.status(201).json({ message: 'User registered successfully', token });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server error' });
        }
    });

    // User login
    router.post('/login', async (req, res) => {
        try {
            // Destructure username and password from the request body
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Please enter all required fields' });
            }
    
            // Find user by username
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
    
            // Compare the provided password with the stored hashed password
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                    // If password matches
                    const token = jwt.sign(
                        { id: user._id, firstName: user.firstName , username: user.username},
                        secrets.jwt_secrets,
                        { expiresIn: '1h' } // Token expiration time
                    );
                    res.status(200).json({ message: 'User logged in successfully', token });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    // An endpoint used to verify a user's token
    router.get('/validateToken', verifyToken, (req, res) => {
        // If the token is valid, the verifyToken middleware will pass
        res.json({ valid: true, user: req.user });
    });

    return router;
};
