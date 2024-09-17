import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { courses } from '../Data'; // Make sure this path is correct

const Cour = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery) ||
    course.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Courses</h1>
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className=" text-gray-700 text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description.substring(0, 100)}...</p>
              <p className=" text-gray-700 text-lg font-semibold mb-4">Price: {course.price}</p>
              <Link to={`/cour/${course.id}`} className="text-blue-500 hover:underline">View Course Details</Link>
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
