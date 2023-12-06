// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('User');
    const navigate = useNavigate();
    const homeLinks = [
        { title: "Home", href: "/" }
        // other links for the homepage
      ];
    

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
                        <p>This is a private area for logged-in users.</p>
                        {/* Display user-specific content here */}
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Welcome to StudyBuddy</h1>
                        <p>Your personal study time organizer. Login to create a new planner or a note!</p>
                        {/* Public content */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
