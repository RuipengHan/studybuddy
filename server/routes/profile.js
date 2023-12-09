const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const User = require('../models/User'); // Assuming you have a User model

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

// Fetch profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
      lastName: user.lastName,
      avatar: user.avatar ? user.avatar.toString('base64') : null, // Convert Buffer to base64 string
    };

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update profile
router.post('/update', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedProfile = req.body;

    const user = await User.findOne({ _id: userId });

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
    user.avatar = updatedProfile.avatar || user.avatar;
    
    if (req.file) {
      // If a new file is uploaded, update the avatar field as Buffer
      user.avatar = req.file.buffer;
    }

    await user.save();

    return res.json({ message: 'Profile updated successfully', profile: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
