import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        // This might involve checking for a valid token in local storage or context
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome to your Dashboard</h1>
                    <p>This is a private area for logged-in users.</p>
                    {/* Display user-specific content here */}
                </div>
            ) : (
                <div>
                    <h1>Welcome to StudyBuddy</h1>
                    <p>Your personal study time organizer.</p>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
};

export default HomePage;
