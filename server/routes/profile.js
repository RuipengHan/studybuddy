// routes/profile.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const User = require('../models/User'); // Assuming you have a User model


router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log("Here!")
        // Fetch the user from the database
        const user = await User.findOne({ _id: userId });

        // If the user doesn't exist, return an appropriate response
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Extract the profile information from the user
        const profile = {
            gender: user.gender,
            birthday: user.birthday,
            location: user.location,
            phoneNumber: user.phoneNumber,
            email: user.email,
            languages: user.languages,
            interests: user.interests,
            aboutMe: user.aboutMe,
            education: user.education,
            workExperience: user.workExperience,
            courses: user.courses,
            skills: user.skills,
            projects: user.projects,
            firstName: user.firstName,
            lastName: user.lastName
            // Add more fields as needed
        };

        return res.json(profile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/update', verifyToken, async (req, res) => {
    try {
    const userId = req.user.id; // Assuming you have authentication middleware that attaches the user to the request
    const updatedProfile = req.body; // Assuming the updated profile data is sent in the request body
    
    // Fetch the user from the database
    const user = await User.findOne({ _id: userId });

    // If the user doesn't exist, return an appropriate response
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile fields with the new data
    user.gender = updatedProfile.gender || user.gender;
    user.birthday = updatedProfile.birthday || user.birthday;
    user.location = updatedProfile.location || user.location;
    user.phoneNumber = updatedProfile.phoneNumber || user.phoneNumber;
    user.email = updatedProfile.email || user.email;
    user.languages = updatedProfile.languages || user.languages;
    user.interests = updatedProfile.interests || user.interests;
    user.aboutMe = updatedProfile.aboutMe || user.aboutMe;
    user.education = updatedProfile.education || user.education;
    user.workExperience = updatedProfile.workExperience || user.workExperience;
    user.courses = updatedProfile.courses || user.courses;
    user.skills = updatedProfile.skills || user.skills;
    user.projects = updatedProfile.projects || user.projects;
    // Add more fields as needed

    // Save the updated user profile to the database
    await user.save();

    return res.json({ message: 'Profile updated successfully', profile: user });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
    }
    
});


module.exports = router;

