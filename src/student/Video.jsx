import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const Video = () => {
  const [registered, setRegistered] = React.useState(false);
  const [locked] = React.useState(true);
  const navigate = useNavigate();

  const handleRegister = () => {
    setRegistered(true);
    navigate('/enroll');
  };

  return (
    <section
      className="w-full h-screen flex flex-col md:flex-row p-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/business-geometric-blue-colorful-abstract-design-background_249611-712.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Locked Courses Section */}
      <div className="relative z-10 md:w-1/3 flex flex-col p-4 border-r border-gray-600">
        <h2 className="text-3xl font-bold mb-4 text-white">Course Sections</h2>
        <div className="space-y-4 flex-1 overflow-auto">
          {["Python Intro", "Python Data Types", "Python Functions"].map((section, index) => (
            <div
              key={index}
              className="p-4 bg-gray-700 rounded-lg flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 cursor-pointer"
            >
              <span className="text-lg text-gray-300 font-semibold">Section {section}</span>
              <div className="text-gray-500 flex items-center">
                {locked ? (
                  <LockClosedIcon
                    className="w-6 h-6 text-red-500 hover:text-red-400 transition-colors duration-300"
                  />
                ) : (
                  <LockOpenIcon
                    className="w-6 h-6 text-green-500 hover:text-green-300 transition-colors duration-300"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {!registered && (
          <button
            type="button"
            onClick={handleRegister}
            className="mt-6 py-2 px-4 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Register to Unlock
          </button>
        )}
      </div>
      
      {/* Video Section */}
      <div className="relative z-10 md:w-2/3 flex items-center justify-center p-4">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full absolute top-0 left-0 rounded-lg border border-gray-600"
            src=""
            title="Course Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Roadmap = ({ handleRegister, registered }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 text-black">
    <h1 className="text-4xl font-bold mb-8">React.js Roadmap</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
      {/* Month 1 */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Month 1</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 1: Prerequisites</h3>
          <ul className="list-disc list-inside">
            <li>HTML Basics</li>
            <li>CSS Basics</li>
            <li>JavaScript Basics</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 2: React Basics</h3>
          <ul className="list-disc list-inside">
            <li>Create React App</li>
            <li>JSX (JavaScript Syntax Extension)</li>
            <li>Props</li>
            <li>Handling States / useState Hook</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 3: React Basics (contd.)</h3>
          <ul className="list-disc list-inside">
            <li>Handling functions in React</li>
            <li>Handling JSX events</li>
            <li>Conditional Rendering</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 4: React Basics (contd.)</h3>
          <ul className="list-disc list-inside">
            <li>setState and Component Life Cycle methods</li>
            <li>Learn Building forms in React</li>
          </ul>
        </div>
      </div>

      {/* Month 2 */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Month 2</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 1: Advanced Topics</h3>
          <ul className="list-disc list-inside">
            <li>Debugging and logging</li>
            <li>Fetching & displaying data from external API</li>
            <li>Browser's local storage</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 2: Advanced Topics (contd.)</h3>
          <ul className="list-disc list-inside">
            <li>Handling errors in React</li>
            <li>Commonly used React Hooks</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 3: React Libraries</h3>
          <ul className="list-disc list-inside">
            <li>Axios - HTTP Requests</li>
            <li>Redux - State Management</li>
            <li>React Router - Routing</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Week 4: React Libraries (contd.)</h3>
          <ul className="list-disc list-inside">
            <li>Styling UI libraries (Bootstrap, CSS, Tailwind, etc.)</li>
            <li>Formik and React Hook Form</li>
          </ul>
        </div>
      </div>

      {/* Month 3 */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Month 3</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Project Assignment</h3>
          <p>Throughout this month, you will work on a comprehensive project that will encompass all the topics covered in the previous months. This project will include:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Developing a full-fledged React application</li>
            <li>Implementing state management with Redux</li>
            <li>Utilizing React Router for navigation</li>
            <li>Fetching and displaying data from APIs</li>
          </ul>
          <p className="mt-4">You will be guided by a mentor who will provide feedback and assistance as you progress. This is an excellent opportunity to solidify your skills and create a project for your portfolio.</p>
        </div>
      </div>
    </div>
    {!registered && (
      <button
        type="button"
        onClick={handleRegister}
        className="mt-6 py-2 px-4 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
      >
        Register to Unlock
      </button>
    )}
  </div>
);

const CoursePage = () => {
  const [registered, setRegistered] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    setRegistered(true);
    navigate('/enroll');
  };

  return (
    <div>
      <Roadmap handleRegister={handleRegister} registered={registered} />
    </div>
  );
};

export default CoursePage;
