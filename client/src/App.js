import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/Profile'; // Import the ProfilePage component
import NewTask from './pages/Newtask';
import TaskDetail from './pages/TaskDetailView';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new_task" element={<NewTask/>} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Add a route for the profile page */}
        <Route path="/task/:taskId" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
