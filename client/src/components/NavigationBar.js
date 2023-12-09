// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const NavigationBar = ({ isLoggedIn, firstName, handleLogout, links }) => {
    const avatarLink = isLoggedIn ? '/profile' : '/login';
    const location = useLocation(); // This hook gives you the current location object

    const getLinkClassName = (path) => {
        const isActive = location.pathname === path;
        // Base classes for all links
        let classNames = "text-blue-600 hover:text-blue-800 font-medium transition-all duration-300";
    
        // Add 'underline' for the active link and scaling effect on hover
        if (isActive) {
            classNames += " underline";
        }
    
        // Add scaling on hover
        classNames += " transform hover:scale-110"; // Scales up to 110% on hover
    
        return classNames;
    };

    return (
        <div className="w-1/5 bg-white p-5 shadow-lg">
            <div className="flex flex-col items-center mb-10">
                <Link to={avatarLink}>
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
                                    <Link key={index} to={link.href} className={getLinkClassName(link.href)}>
                                        {link.title}
                                    </Link>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className={getLinkClassName("no_underline")}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <Link to="/login" className={getLinkClassName("no_underline")}>Login</Link>
                            <Link to="/register" className={getLinkClassName("no_underline")}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
