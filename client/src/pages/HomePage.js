// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import CalendarView from '../components/CalendarView'; 
import moment from 'moment';
const setting = require('../config/config');
const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('User');
    
    const [currentMonth, setCurrentMonth] = useState({
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD')
    });
    const navigate = useNavigate();
    const homeLinks = [
        { title: "Home", href: "/" },
        { title: "New Task", href: "/new_task" },
        { title: "Profile", href: "/profile" },
        // other links for the homepage
      ];
    

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        setIsLoggedIn(false);
        navigate('/login'); // Optionally redirect to the login page
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
                <NavigationBar isLoggedIn={isLoggedIn} firstName={firstName} handleLogout={handleLogout} links = {homeLinks} />
                {/* Add additional navigation items here */}
            <div className="w-4/5 p-12 text-white">
                {isLoggedIn ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
                    {/* Improved styling for user-specific content */}
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <p className="text-xl font-semibold text-gray-800 mb-4">Your Upcoming Events:</p>
                        <CalendarView startDate={currentMonth.startDate} endDate={currentMonth.endDate} />
                    </div>
                </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Welcome to StudyBuddy</h1>
                        <p className="text-lg text-gray-300 mb-4">Your personal study time organizer. Login to create a new planner or a note!</p>
                        {/* Public content */}
                  </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
