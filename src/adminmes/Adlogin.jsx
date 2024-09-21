import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../App';

const Login = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const lightThemeImages = [
    'https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg',
    'https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg',
    'https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-7455.jpg'
  ];

  const darkThemeImages = [
    'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg',
    'https://img.freepik.com/free-vector/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37330.jpg',
    'https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg'
  ];

  const images = isDarkMode ? darkThemeImages : lightThemeImages;

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(imageInterval);
  }, [images.length, isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

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
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row overflow-hidden ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12">
        <div className={`p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm md:text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-2 md:p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
                  aria-label="Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm md:text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full p-2 md:p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'border-gray-700 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-900'}`}
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
              className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 md:py-3 rounded hover:from-blue-600 hover:to-teal-600 transition-colors duration-300 flex justify-center items-center`}
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
            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
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

export default Login;
