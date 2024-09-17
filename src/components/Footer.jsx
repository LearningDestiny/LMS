import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">Learning Destiny</div>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/cour" className="hover:text-white">Courses</Link></li>
            <li><Link to="/Aboutus" className="hover:text-white">About Us</Link></li>
            <li><Link to="/Contactsform" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="text-sm flex justify-between items-center">
          <div>&copy; 2024 Learning Destiny. All rights reserved.</div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <span className="text-gray-400">|</span>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
