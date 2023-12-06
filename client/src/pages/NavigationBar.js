// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ isLoggedIn, firstName, handleLogout, links }) => {
    return (
        <div className="w-1/5 bg-white p-5 shadow-lg">
            <div className="flex flex-col items-center mb-10">
                <Link to="/profile">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-500 mb-3">
                        <span>Avatar</span>
                    </div>
                </Link>
                <div className="text-center">
                    {isLoggedIn ? (
                        <>
                            <p className="mb-6">Welcome back, {firstName}!</p>
                            <div className="flex flex-col items-center space-y-3">
                                {links.map((link, index) => (
                                    <Link key={index} to={link.href} className="text-blue-600 hover:text-blue-800 font-medium">
                                        {link.title}
                                    </Link>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login</Link>
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
