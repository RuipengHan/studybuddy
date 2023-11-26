import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            // console.log("returned data", data)
            if (response.ok) {
                const { token } = data;
                const decoded = jwtDecode(token);
                const firstName = decoded.firstName;
                localStorage.setItem('token', token);
                // console.log("returned decoded data", decoded)
                localStorage.setItem('firstName', firstName);
                navigate('/');    
            } else {
                console.error('Login failed:', data.message); // Handle errors, e.g., show an alert to the user
            }
        } catch (error) {
            console.error('There was a problem with the login request:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
            <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            aria-label="Username"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            aria-label="Password"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <p className="mt-2 text-sm text-blue-500 text-right cursor-pointer">
                            Forgot Password?
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <a
                            className="font-medium text-sm text-blue-500 hover:text-blue-800"
                            href="/register"
                        >
                            Not a member? Signup
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
