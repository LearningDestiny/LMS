import React from 'react';
import { useNavigate } from 'react-router-dom';
import testing from '../assets/testing.png'

const CourseCard = ({ course, currentUser }) => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate(`/admin-dashboard/course/${course.id}`);
  };

  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      style={{
        // backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/029/887/892/non_2x/colorful-gradients-modern-and-clean-background-free-vector.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <img 
        src={course.imageUrl || testing} 
        alt={course.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{course.title}</h2>
        <p className="text-gray-400 mt-2">{course.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img 
              src={currentUser?.photoURL || 'https://source.unsplash.com/40x40/?profile'} 
              alt={currentUser?.displayName || 'Instructor'} 
              className="w-8 h-8 rounded-full" 
            />
            <span className="text-gray-300 text-sm ml-2">{course.instructorName || 'Instructor'}</span>
          </div>
          <div className="text-gray-300 text-sm ml-2">
            ${course.price?.toFixed(2) || 'N/A'}
          </div>
        </div>
        <button
          onClick={handleEnrollClick}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
