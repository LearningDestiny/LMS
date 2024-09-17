import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../Data';
import Footer from '../components/Footer';
import EnrollmentForm from './EnrollmentForm';

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = courses.find(c => c.id === Number(courseId));
  const [isFormVisible, setFormVisible] = useState(false);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">Course not found</h1>
      </div>
    );
  }

  const handleEnrollClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto py-12 px-6 flex-grow">
        {/* Course Header */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left border-b border-gray-300 pb-8">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full md:w-1/3 rounded-lg mb-6 md:mb-0 shadow-lg transition-transform transform hover:scale-105 border border-gray-300"
          />
          <div className="md:ml-8">
            <h2 className="text-5xl font-extrabold mb-4">{course.title}</h2>
            <p className="mb-4 text-lg text-gray-700">{course.description}</p>
            <p className="text-lg"><strong>Instructor:</strong> {course.instructor}</p>
            <p className="text-lg"><strong>Duration:</strong> {course.duration}</p>
            <p className="text-lg"><strong>Lectures:</strong> {course.lectureCount}</p>
            <p className="font-bold mt-6 text-3xl">{course.price}</p>
            <button
              className="mt-6 py-3 px-8 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 shadow-lg transform hover:scale-105"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Course Highlights */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6">Course Highlights</h3>
          <ul className="list-disc list-inside text-lg ml-8 text-gray-700 border-l-4 border-dotted border-gray-400 pl-4">
            {course.highlights.map((highlight, index) => (
              <li key={index} className="mb-2">{highlight}</li>
            ))}
          </ul>
        </div>

        {/* Course Roadmap */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6">Course Roadmap</h3>
          <div className="space-y-8">
            {course.roadmap.map((month, monthIndex) => (
              <div key={monthIndex} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                <h4 className="text-2xl font-bold mb-4">{month.month}</h4>
                {month.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="mb-6">
                    <h5 className="text-xl font-semibold mb-3 text-gray-800">{week.week}</h5>
                    <ul className="list-disc list-inside ml-6 text-lg text-gray-700">
                      {week.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="mb-1">{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {isFormVisible && <EnrollmentForm course={course} onClose={handleCloseForm} />}
    </div>
  );
};

export default CourseDetails;
