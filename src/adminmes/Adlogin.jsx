import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import 'react-toastify/dist/ReactToastify.css';

const Adlogin = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for image rotation
  const navigate = useNavigate();

  // Array of background images
  const images = [
    'https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg',
    'https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg',
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-vector%2Fsecure-login-concept-illustration_11608455.htm&psig=AOvVaw0UZTGHA-6j3c-qi7FswI12&ust=1726685627130000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNi_6rDTyogDFQAAAAAdAAAAABAp'
  ];

  // Change image every 10 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(imageInterval);
  }, [images.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state to true

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Navigate based on the user's role
        if (role === 'admin') {
          navigate('/admin-dashboard/requests');
        } else {
          navigate('/');
        }
      } else {
        setError('User role not found.');
        toast.error('User role not found in Firestore!', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      setError('Failed to log in.');
      toast.error('Invalid email or password!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className={`min-h-screen flex overflow-hidden ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className={`p-8 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
                  aria-label="Email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={`block text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded hover:from-blue-600 hover:to-teal-600 transition-colors duration-300 flex justify-center items-center`}
              disabled={loading}
              aria-label="Login"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`hidden md:block w-1/2`}
        style={{ 
          backgroundImage: `url(${images[currentImageIndex]})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '100vh' 
        }}
      ></div>
      <ToastContainer />
    </div>
  );
};

export default Adlogin;
