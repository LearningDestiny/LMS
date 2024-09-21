import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { courses } from '../Data'; // Make sure this path is correct
import { useTheme } from '../App';
const Cour = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const { isDarkMode } = useTheme();
console.log(isDarkMode)
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery) ||
    course.description.toLowerCase().includes(searchQuery)
  );

  const handleEnrollClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  const cardClasses = `relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
    isDarkMode ? 'border-pink-500 hover:border-blue-500 bg-gray-900 text-gray-200' : 'border-blue-500 hover:border-pink-500 bg-white text-black'
  }`;

  return (
    <div className={`container mx-auto py-12 px-4 md:px-8 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Our Courses</h1>
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className={`${cardClasses} w-full flex-shrink-0 relative`}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <h4 className="font-semibold mt-2 text-sm">{course.title}</h4>
              <p className="text-xs">{course.instructor}</p>
              <p className="font-bold mt-1 text-sm">{course.price}</p>
              {hoveredCourse === course.id && (
                <div className={`absolute inset-0 p-4 shadow-lg z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`} style={{ height: '100%' }}>
                  <h4 className="font-semibold text-sm">{course.title}</h4>
                  <p className="text-xs mt-1">{course.lastUpdated}</p>
                  <p className="text-xs mt-2">{course.duration} total hours · {course.lectureCount} lectures · All Levels</p>
                  <p className="text-xs mt-2">{course.description}</p>
                  <ul className="text-xs mt-2">
                    {course.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center mt-0">
                        <FaPlayCircle className="mr-1" /> {highlight}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className={`mt-4 py-2 px-4 w-full font-semibold rounded ${isDarkMode ? 'bg-white text-black hover:bg-blue-600' : 'bg-black text-white hover:bg-blue-600'}`}
                    style={{ fontSize: '0.875rem' }}
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No courses found matching your search.</p>
      )}
    </div>
  );
};

export default Cour;
