import React, { useState } from 'react';
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
import Adlogin from '../src/adminmes/Adlogin'; 
import Message from './adminmes/Message';
import Contactsform from './Pages/Contactsform';
import Signup from './adminmes/Signup';
import ProtectedRoute from './Authentication/ProtectedRoutes'; 
import AdminLayout from './Authentication/AdminLayout';// Import the new ProtectedRoute component

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/enroll/:courseId" element={<CourseDetails />} />
          <Route path="/enroll/:courseId" element={<StaticEnroll />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/businessForm" element={<BusinessForm />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/cour" element={<Cour />} />
          <Route path="/cour/:courseId" element={<CourseDetails />} />
          <Route path="/admin-login" element={<Adlogin />} />
          <Route path="/Contactsform" element={<Contactsform />} />
          <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />

          {/* Protected Admin Dashboard Routes */}
          <Route 
            path="/admin-dashboard/*" 
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="adminview" element={<Adminview />} />
                  <Route path="requests" element={<Message />} />
                  <Route path="addCourses" element={<AddCourses />} />
                  <Route path="allCourses" element={<AllCourses />} />
                  <Route path="course/:courseId" element={<CoursePreview />} />
                  <Route path="students" element={<Students />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
