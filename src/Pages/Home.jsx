import React, { useState, useEffect, useRef } from 'react';
import { FaStar, FaPlayCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { courses as initialCourses, categories, workshops, events, internships } from '../Data';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import pic from '../assets/pic.png';

const Home = ({ isDarkMode }) => {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [courses, setCourses] = useState(initialCourses);
  const navigate = useNavigate();
  const courseContainerRef = useRef(null); // Reference for the scroll container

  const handleEnrollClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  const handleScroll = (direction) => {
    if (courseContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount
      courseContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionClasses = "relative z-10 mb-16 md:p-8";
  const cardClasses = `relative border rounded-lg p-4 cursor-pointer transition-all duration-300 ${isDarkMode ? 'border-pink-500 hover:border-blue-500 bg-gray-900 text-gray-200' : 'border-blue-500 hover:border-pink-500 bg-white text-black'}`;
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfQTciGaIsCogHy-NdL2RJ_tP71ysxKsQkREz2iawSeh5_hBw/viewform?usp=sf_link";

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-black'} font-body`}>
      <main className="container mx-auto py-2 px-4 md:px-8">
        {/* Hero Section */}
        <section
          className="flex flex-col md:flex-row items-center justify-between text-center md:text-left py-16 md:py-32 relative overflow-hidden"
          style={{
            backgroundImage: `url(https://1vvan.github.io/blinqpay/images/top-block/background-top.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="z-10 flex-grow max-w-full md:max-w-2xl lg:max-w-4xl p-4 md:mr-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              A Broad Selection of Courses
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
              Choose from over 10,000 online video courses with new additions published every month. Learning Destiny offers courses covering a wide range of topics, including web development, data science, business, design, marketing, and more. Whether you're a beginner looking to learn the basics or an expert seeking advanced skills, our platform has something for everyone.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {categories.slice(0, 5).map((category, index) => (
                <button
                  key={index}
                  className="text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                  onClick={() => navigate(`/category/${category.name}`)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 z-10 mt-8 md:mt-0">
            <img src={pic} alt="Learning Destiny Logo" className="h-24 md:h-35 lg:h-48 rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Courses Section with Scroll Arrows */}
        <section className={sectionClasses}>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-accent">Our Popular Courses</h3>
          <div className="relative">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 z-10"
            >
              <FaArrowLeft />
            </button>

            {/* Scrollable Courses Container */}
            <div
              className="flex space-x-4 overflow-x-scroll "
              ref={courseContainerRef}
              style={{ scrollBehavior: 'smooth' }}
            >
              {courses.map(course => (
                <div
                  key={course.id}
                  className={cardClasses}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  style={{ minWidth: '250px', height: '300px' }}
                >
                  <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold mt-2 text-sm">{course.title}</h4>
                  <p className="text-xs">{course.instructor}</p>
                  <div className="flex items-center mt-1">
                    {/* <span className="text-orange-400 font-bold mr-1 text-sm">{course.rating.toFixed(1)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.round(course.rating) ? 'text-orange-400' : 'text-gray-600'} />
                      ))}
                    </div> */}
                    {/* <span className="text-xs ml-1">({course.ratingCount})</span> */}
                  </div>
                  <p className="font-bold mt-1 text-sm">{course.price}</p>
                  {hoveredCourse === course.id && (
                    <div className={`absolute inset-0 p-4 shadow-lg z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`} style={{ height: '100%' }}>
                      <h4 className="font-semibold text-sm">{course.title}</h4>
                      <p className="text-xs mt-1">{course.lastUpdated}</p>
                      <p className="text-xs mt-2">{course.duration} total hours · {course.lectureCount} lectures · All Levels</p>
                      <p className="text-xs mt-2">{course.description}</p>
                      <ul className="text-xs mt-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center mt-1">
                            <FaPlayCircle className="mr-2" /> {highlight}
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

            {/* Right Scroll Arrow */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 z-10"
            >
              <FaArrowRight />
            </button>
          </div>
        </section>

        <section className={sectionClasses}>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-accent">Upcoming Workshops</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {workshops.map(workshop => (
                <div key={workshop.id} className={cardClasses} style={{ minWidth: '250px', height: '300px' }}>
                  <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold mt-2 text-sm">{workshop.title}</h4>
                  <p className="text-xs">{workshop.instructor}</p>
                  <p className="font-bold mt-1 text-sm">{workshop.price}</p>
                  <button
                    onClick={() => window.open(googleFormUrl, '_blank')}
                    className="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className={sectionClasses}>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-accent">Upcoming Events</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {events.map(event => (
                <div key={event.id} className={cardClasses} style={{ minWidth: '250px', height: '300px' }}>
                  <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold mt-2 text-sm">{event.title}</h4>
                  <p className="text-xs">{event.organizer}</p>
                  <p className="font-bold mt-1 text-sm">{event.date}</p>
                  <button
                    onClick={() => window.open(googleFormUrl, '_blank')}
                    className="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internships Section */}
        <section className={sectionClasses}>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-accent">Internship Opportunities</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {internships.map(internship => (
                <div key={internship.id} className={cardClasses} style={{ minWidth: '250px', height: '300px' }}>
                  <img src={internship.imageUrl} alt={internship.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <h4 className="font-semibold mt-2 text-sm">{internship.title}</h4>
                  <p className="text-xs">{internship.company}</p>
                  <p className="font-bold mt-1 text-sm">{internship.stipend}</p>
                  <button
                    onClick={() => window.open(googleFormUrl, '_blank')}
                    className="mt-2 py-1 px-3 bg-blue-500 text-white rounded"
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
