import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('User');
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

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="w-1/5 bg-white p-5 shadow-lg">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-500 mb-3">
                        {/* Placeholder for avatar */}
                        <span>Avatar</span>
                    </div>
                    <div className="text-center">
                        {isLoggedIn ? (
                            <p className="mb-6">Welcome back, {firstName}!</p>
                        ) : (
                            <>
                                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium mb-3">Login</Link>
                                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
                            </>
                        )}
                    </div>
                </div>
                {/* Add additional navigation items here */}
            </div>
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
                        <p>Your personal study time organizer.</p>
                        {/* Public content */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
