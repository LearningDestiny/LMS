import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user role in Firestore (default to 'student')
      await setDoc(doc(firestore, 'users', user.uid), {
        email,
        role: 'student', // Default role
      });

      toast.success('Account created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      setError('Failed to create account.');
      toast.error('Signup failed! Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`relative w-full max-w-md p-8 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded hover:from-blue-600 hover:to-teal-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
