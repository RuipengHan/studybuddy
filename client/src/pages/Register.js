import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const setting = require('../config/config');

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Optional
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${setting.base_url}/api/auth/register`, { // Replace with your API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, firstName, lastName, phoneNumber}),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Save the token
                navigate('/'); // Redirect to the home page
            } else {
                console.error('Registration failed:', data.message); // Handle errors, e.g., show an alert to the user
            }
        } catch (error) {
            console.error('There was a problem with the registration request:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h1>

                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number (Optional)
                        </label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            placeholder="(555) 555-5555"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
