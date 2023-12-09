import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';

const TaskDetailView = () => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('User');
  const navigate = useNavigate();
  const homeLinks = [
    { title: "Home", href: "/" },
    { title: "New Task", href: "/new_task" },
    { title: "My Calendar", href: "/calendar" },
    { title: "Profile", href: "/profile" },
    // other links for the homepage
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setIsLoggedIn(false);
    navigate('/login'); // Optionally redirect to the login page
  };  


  useEffect(() => {
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:4000/api/auth/validateToken', {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
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


  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/task/${taskId}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        setTask(response.data.task);
      } catch (error) {
        console.error('Error fetching task details', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
        <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links = {homeLinks} />
        <h2>This is the detailed page for the task "{task.title}"</h2>
        {/* Render other task details */}
      </div>
    </div>
  );
};

export default TaskDetailView;
