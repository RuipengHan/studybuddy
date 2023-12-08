// ProfilePage.js
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('User');
  const profileLinks = [
    { title: 'Home', href: '/' },
    // other links for the profile page
  ];

  const [aboutMe, setAboutMe] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  // Additional profile information
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');

  // New sections
  const [languages, setLanguages] = useState('');
  const [interests, setInterests] = useState('');
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:4000/api/auth/validateToken', {
            method: 'GET',
            headers: {
              'Authorization': token,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsLoggedIn(true);
            setFirstName(data.user.firstName); // Or however you're storing the first name
          } else {
            localStorage.removeItem('token'); // Token is invalid or expired
            localStorage.removeItem('firstName');
          }
        } catch (error) {
          console.error('Error validating token:', error);
        }
      }
    };
    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsLoggedIn(false);
    navigate('/login'); // Optionally redirect to the login page
  };

  const handleEditAboutMe = (event) => {
    setAboutMe(event.target.value);
  };

  const handleEditSkills = (event) => {
    setSkills(event.target.value);
  };

  const handleEditProjects = (event) => {
    setProjects(event.target.value);
  };

  const handleEditEducation = (event) => {
    setEducation(event.target.value);
  };

  const handleEditWorkExperience = (event) => {
    setWorkExperience(event.target.value);
  };

  // Additional profile information handlers
  const handleEditPhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEditGender = (event) => {
    setGender(event.target.value);
  };

  const handleEditFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleEditEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleEditLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleEditBirthday = (event) => {
    setBirthday(event.target.value);
  };

  // New sections handlers
  const handleEditLanguages = (event) => {
    setLanguages(event.target.value);
  };

  const handleEditInterests = (event) => {
    setInterests(event.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links={profileLinks} />
      <div className="flex-1 p-8 overflow-y-scroll">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div
                className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500"
              >
                <span>A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{firstName}</h1>
                <p className="text-gray-500">Web Developer</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit Profile</button>
          </div>

          {/* About Me */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={aboutMe}
              onChange={handleEditAboutMe}
              placeholder="Tell something about yourself..."
            />
          </div>

          {/* Skills */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={skills}
              onChange={handleEditSkills}
              placeholder="List your skills, separated by commas..."
            />
          </div>

          {/* Projects */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={projects}
              onChange={handleEditProjects}
              placeholder="Describe your projects..."
            />
          </div>

          {/* Education */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={education}
              onChange={handleEditEducation}
              placeholder="Describe your education history..."
            />
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={workExperience}
              onChange={handleEditWorkExperience}
              placeholder="Describe your work experience..."
            />
          </div>

          {/* Additional Profile Information */}
          <div className="bg-white p-6 mb-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={phoneNumber}
                  onChange={handleEditPhoneNumber}
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={gender}
                  onChange={handleEditGender}
                />
              </div>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={fullName}
                  onChange={handleEditFullName}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={email}
                  onChange={handleEditEmail}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={location}
                  onChange={handleEditLocation}
                />
              </div>
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <input
                  type="text"
                  id="birthday"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={birthday}
                  onChange={handleEditBirthday}
                />
              </div>
              {/* New Sections */}
              <div>
                <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
                  Languages
                </label>
                <textarea
                  id="languages"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={languages}
                  onChange={handleEditLanguages}
                  placeholder="List the languages you speak..."
                />
              </div>
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                  Interests
                </label>
                <textarea
                  id="interests"
                  className="mt-1 p-2 border rounded-md w-full"
                  value={interests}
                  onChange={handleEditInterests}
                  placeholder="List your interests, separated by commas..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
