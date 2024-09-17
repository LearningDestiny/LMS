import React, { useState } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { FaBook, FaClipboardList, FaPlus, FaUsers, FaChartBar, FaCog, FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons/fa
import { useAuth } from '../Authentication/AuthContext'; // Import useAuth from your context

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const { logout, currentUser, role } = useAuth(); // Destructure logout, currentUser, and role from useAuth

  // Redirect to login if user is not authenticated or not an admin
  if (!currentUser || role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  const handleNavigate = (path) => {
    navigate(path);
    closeSidebar();
  };

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home or login page after logout
      console.log('Logout successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout error
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white relative">
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        {!showSidebar ? (
          <button onClick={openSidebar} className="text-gray-400 focus:outline-none">
            <FaBars className="text-2xl" />
          </button>
        ) : (
          <button onClick={closeSidebar} className="text-gray-400 focus:outline-none">
            <FaTimes className="text-2xl" />
          </button>
        )}
      </div>

      {/* Sidebar (Mobile) */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-gray-950 z-40 ${showSidebar ? 'block' : 'hidden'}`}
      >
        <div className="flex items-center justify-between p-4 relative">
          <div className="flex flex-col items-center">
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="Avatar"
              className="rounded-full w-16 h-16 mb-2"
            />
            <div className="text-xl font-bold">{currentUser.displayName}</div>
          </div>
        </div>

        <nav>
          <button onClick={() => handleNavigate('/admin-dashboard/allCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaBook className="mr-2" />
            All Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/addCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaPlus className="mr-2" />
            Add Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/myCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaPlus className="mr-2" />
            My Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/students')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaUsers className="mr-2" />
            Students
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/requests')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaClipboardList className="mr-2" />
            Requests
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/analytics')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaChartBar className="mr-2" />
            Analytics
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/settings')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaCog className="mr-2" />
            Settings
          </button>
          <button onClick={handleLogout} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaCog className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:flex-col md:w-64 p-4 bg-gray-950">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="Avatar"
            className="rounded-full w-16 h-16 mb-2"
          />
          <div className="text-xl font-bold">{currentUser.displayName}</div>
        </div>

        <nav>
          <button onClick={() => handleNavigate('/admin-dashboard/allCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaBook className="mr-2" />
            All Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/addCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaPlus className="mr-2" />
            Add Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/myCourses')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaPlus className="mr-2" />
            My Courses
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/students')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaUsers className="mr-2" />
            Students
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/requests')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaClipboardList className="mr-2" />
            Requests
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/analytics')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaChartBar className="mr-2" />
            Analytics
          </button>
          <button onClick={() => handleNavigate('/admin-dashboard/settings')} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaCog className="mr-2" />
            Settings
          </button>
          <button onClick={handleLogout} className="flex items-center block py-2 px-4 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none">
            <FaCog className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2 overflow-y-auto">
        <div className="shadow-lg">
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
