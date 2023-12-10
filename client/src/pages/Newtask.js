// NewTask.js
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const NewTask = ({ onTaskAdded }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('User');

  const profileLinks = [
    { title: 'Home', href: '/' },
    { title: "New Task", href: "/new_task" },
    { title: "Profile", href: "/profile" },9
    // other links for the profile page
  ];

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      // console.log('token', token)
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

  const [task, setTask] = useState({
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
    const currentDate = new Date();
    task.creationDate = currentDate.toISOString();

    try {
      // Perform validation or additional checks as needed before sending the request
      const response = await axios.post('http://localhost:4000/api/task', task, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      // Assuming the API returns the newly added task, you can update the UI accordingly
      if (response.data.status === 201) {
        onTaskAdded(response.data); // Notify the parent component about the new task
        setTask({
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

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      console.log("token", token)
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

  return (
    // <div className="flex h-screen bg-gray-100">
    <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links={profileLinks} />
      <div className="w-4/5 p-12 text-white">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="new-task-container p-8 bg-white rounded shadow-md w-96 mb-4">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
            <form>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3"
                  style={{ color: 'black' }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3"
                  style={{ color: 'black' }}
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
                  style={{ color: 'black' }}
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
    </div>
  );
  
  
};

export default NewTask;
