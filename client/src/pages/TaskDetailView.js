import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
const setting = require('../config/config');

const TaskDetailView = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    tags: []
  });
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
                const response = await fetch(`${setting.base_url}/api/auth/validateToken`, {
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
        const response = await axios.get(`${setting.base_url}/api/task/${taskId}`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleTagChange = (index, value) => {
    let newTags = [...task.tags];
    newTags[index] = value;
    setTask({ ...task, tags: newTags });
  };

  const handleDeleteTask = async() =>{
    try {
      const response = await axios.delete(`${setting.base_url}/api/task/${taskId}`,  {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      // ... handle the response
      if (response.status === 200){
        window.alert("Successfully Delete task")
      }
      else{
        window.alert("Failed to Delete task")
      }
      // back to home page
      navigate('/');
    } catch (error) {
      console.error('Error Deleting task', error);
      window.alert('Error Deleting task', error)
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`${setting.base_url}/api/task/${taskId}`, task, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      // ... handle the response
      if (response.status === 200){
        window.alert("Successfully Update task")
      }
      else{
        window.alert("Failed to Update task")
      }
    } catch (error) {
      alert('Error updating task', error);
    }
  };

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return '';
  
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

  // return (
  //   <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
  //     <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links={homeLinks} />
    
  //     <div className="flex-1 flex flex-col justify-center items-center">
  //       <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-lg p-6">
  //         <input
  //           type="text"
  //           name="title"
  //           value={task.title}
  //           onChange={handleInputChange}
  //           className="font-bold text-2xl mb-2 text-blue-800 w-full"
  //         />
  //         <textarea
  //           name="description"
  //           value={task.description}
  //           onChange={handleInputChange}
  //           className="text-gray-700 text-base mb-4 w-full"
  //         />
  //         <input
  //           type="date"
  //           name="dueDate"
  //           value={formatDateToYYYYMMDD(task.dueDate)}
  //           onChange={handleInputChange}
  //           className="text-gray-600 text-sm mb-4 w-full"
  //         />
  //         {task.tags.map((tag, index) => (
  //           <input
  //             key={index}
  //             type="text"
  //             value={tag}
  //             onChange={(e) => handleTagChange(index, e.target.value)}
  //             className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2 w-full"
  //           />
  //         ))}

  //         <button
  //           onClick={handleUpdateTask}
  //           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
  //         >
  //           Update Task
  //         </button>

  //         <button
  //           onClick={handleDeleteTask}
  //           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
  //         >
  //           Delete Task
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links={homeLinks} />
    
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-lg p-6">
          <label htmlFor="title" className="block text-blue-800 font-bold mb-1">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            className="font-bold text-2xl mb-4 text-blue-800 w-full border border-gray-300 rounded p-2"
          />

          <label htmlFor="description" className="block text-blue-800 font-bold mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            className="text-gray-700 text-base mb-4 w-full border border-gray-300 rounded p-2"
          />

          <label htmlFor="dueDate" className="block text-blue-800 font-bold mb-1">Due Date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formatDateToYYYYMMDD(task.dueDate)}
            onChange={handleInputChange}
            className="text-gray-600 text-sm mb-4 w-full border border-gray-300 rounded p-2"
          />

          {task.tags.map((tag, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`tag-${index}`} className="block text-blue-800 font-bold mb-1">Tag {index + 1}</label>
              <input
                id={`tag-${index}`}
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 w-full"
              />
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={handleUpdateTask}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Task
            </button>

            <button
              onClick={handleDeleteTask}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TaskDetailView;
