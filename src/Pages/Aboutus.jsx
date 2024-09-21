import React from 'react';
import pic from '../assets/pic.png';
import { useTheme } from '../App';

function Aboutus() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode ? ' text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'} min-h-screen py-12 md:py-24`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in tracking-tight">
            Welcome to the Learning Destiny Community!
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 max-w-3xl mx-auto">
            Empowering learners, one step at a time with top-notch courses, resources, and community support.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300 mt-6 animate-bounce"
          >
            Join Now
          </a>
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              At Learning Destiny, we specialize in providing courses for all engineering disciplines and career growth. This group is your go-to place for updates on our latest courses, workshops, and events. 
              Connect with fellow learners, discuss ways to improve your skills, find internship opportunities, and stay informed about potential job vacancies.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              We offer top-quality courses, internships, freelancing projects, and comprehensive career guidance at a reasonable price. Whether you're looking to upskill, explore new career paths, or simply expand your knowledge, Learning Destiny is here to guide you.
            </p>
          </div>

          {/* Right Section - Image or Visual */}
          <div className="flex justify-center md:justify-end">
            <img 
              src={pic} 
              alt="Learning Community" 
              className="rounded-lg shadow-lg w-3/4 md:w-full lg:w-3/4" // Responsively adjust width
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Why Join Us?</h2>
            <p className="text-xl font-light max-w-2xl mx-auto">
              Our platform is not just about learning; it's about growing together with like-minded individuals. By joining, you'll have access to career guidance, exclusive resources, and a thriving professional network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300`}>
              <h3 className="text-2xl font-bold mb-2">Top Quality Courses</h3>
              <p className="text-lg">
                Access a wide range of industry-relevant courses designed to help you upskill and excel in your career.
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300`}>
              <h3 className="text-2xl font-bold mb-2">Career Guidance</h3>
              <p className="text-lg">
                Our experts provide personalized career coaching and mentorship to help you succeed in your desired field.
              </p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300`}>
              <h3 className="text-2xl font-bold mb-2">Internships & Freelancing</h3>
              <p className="text-lg">
                Discover exciting internship and freelancing opportunities to gain hands-on experience and build your portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Community Says</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg max-w-sm`}>
              <p className="text-xl mb-4">"Learning Destiny helped me land my first internship and gave me the skills I needed to excel in my career!"</p>
              <span className="block text-indigo-500 font-semibold">- Arun kumar</span>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg max-w-sm`}>
              <p className="text-xl mb-4">"The courses were top-notch and the community support was incredible. I highly recommend it!"</p>
              <span className="block text-indigo-500 font-semibold">- Vijay</span>
            </div>
          </div>
        </div>

        {/* Final Call-to-Action */}
        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl mb-6">
            Ready to take the next step in your learning journey? Join us today!
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300"
          >
            Join Learning Destiny
          </a>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
