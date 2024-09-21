import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import AdminDashboard from './dashboard/AdminDashboard';
import AddCourses from './dashboard/AddCourses';
import AllCourses from './dashboard/AllCourses';
import Students from './dashboard/Students';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';
import CoursePreview from './dashboard/CoursePreview';
import Navbar from './components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Authentication/AuthContext';
import Teach from './student/Teach';  
import BusinessForm from './student/BusinessForm';
import Aboutus from './Pages/Aboutus';
import CategoryPage from './enrollpages/CategoryPage';
import CourseDetails from './enrollpages/CourseDetails';
import StaticEnroll from './student/StaticEnroll';
import ScrollToTop from './components/ScrollToTop';
import Cour from './Pages/Cour';
import Adminview from './admin-view/Adminview';
import Login from '../src/adminmes/Adlogin'; 
import Message from './adminmes/Message';
import Contactsform from './Pages/Contactsform';
import Signup from './adminmes/Signup';
import ProtectedRoute from './Authentication/ProtectedRoutes'; 
import AdminLayout from './Authentication/AdminLayout'; 
import { Outlet } from 'react-router-dom';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <div className={`App ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/enroll/:courseId" element={<CourseDetails />} />
            <Route path="/teach" element={<Teach />} />
            <Route path="/businessForm" element={<BusinessForm />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/cour" element={<Cour />} />
            <Route path="/cour/:courseId" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Contactsform" element={<Contactsform />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Admin Dashboard Routes */}
            <Route path="/admin-dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="adminview" element={<Adminview />} />
              <Route path="requests" element={<Message />} />
              <Route path="addCourses" element={<AddCourses />} />
              <Route path="allCourses" element={<AllCourses />} />
              <Route path="course/:courseId" element={<CoursePreview />} />
              <Route path="students" element={<Students />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
