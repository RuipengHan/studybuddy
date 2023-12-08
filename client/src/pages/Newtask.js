// NewTask.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const NewTask = ({ onTaskAdded }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('User');

  const profileLinks = [
    { title: 'Home', href: '/' },
    // other links for the profile page
  ];

  const [task, setTask] = useState({
    username: '', // You may get the username from the logged-in user
    title: '',
    description: '',
    attachments: [], // Array of objects (fileName, filePath, fileType, fileSize)
    creationDate: '', // Assign the current date on the server side
    dueDate: null,
    tags: [], // Array of strings
    userDefinedFields: [], // Array of objects (fieldName, fieldValue)
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsLoggedIn(false);
    navigate('/login'); // Optionally redirect to the login page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = async () => {
    try {
      // Perform validation or additional checks as needed before sending the request
      const response = await axios.post('http://localhost:4000/api/tasks', task, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      // Assuming the API returns the newly added task, you can update the UI accordingly
      if (response.data) {
        onTaskAdded(response.data); // Notify the parent component about the new task
        setTask({
          username: '',
          title: '',
          description: '',
          attachments: [],
          creationDate: '',
          dueDate: null,
          tags: [],
          userDefinedFields: [],
        });
      }
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links={profileLinks} />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="new-task-container p-8 bg-white rounded shadow-md w-96 mb-4">
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
              <input
                type="text"
                name="username"
                value={task.username}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Attachments:</label>
              {/* Add multiple input fields for attachments */}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Due Date:</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tags:</label>
              {/* Add multiple input fields for tags */}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">User Defined Fields:</label>
              {/* Add multiple input fields for userDefinedFields */}
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  
};

export default NewTask;
