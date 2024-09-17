import React, { useState } from 'react';
import Footer from '../components/Footer';

function Contactsform() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission, such as sending an email or storing in a database
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Contact Information Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:mr-6">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Contact Information</h2>
            <div className="flex items-center justify-center mb-4">
              <img
                src="data:image/png;base64,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" // Replace with the actual image URL or your uploaded image
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-lg"
              />
            </div>
            <div className="text-center text-white">
              <p className="text-2xl font-semibold mb-2">Pranav Devabakhthuni</p>
              <div className="text-lg">
                <p className="mb-2 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26c.77.51 1.8.51 2.57 0L21 8m-2 10h-5a2 2 0 01-2-2v-4a2 2 0 012-2h5a2 2 0 012 2v4a2 2 0 01-2 2z"
                    />
                  </svg>
                  <a href="tel:+919059898900" className="text-blue-400 hover:underline">+91 999590 68980</a>
                </p>
                <p className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12v.01M8 12v.01M12 12v.01M9 21h6a1 1 0 001-1v-7H8v7a1 1 0 001 1zM9 3h6a1 1 0 011 1v3H8V4a1 1 0 011-1z"
                    />
                  </svg>
                  <a href="mailto:devabathinipranavchowdary@gmail.com" className="text-blue-400 hover:underline">
                    devabathinipranavchowdary@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-lg font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 py-3 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-teal-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contactsform;
