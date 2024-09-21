import React, { useState } from 'react';
import { firestore } from '../firebase'; // Adjust the path to your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { useTheme } from '../App';

const BusinessForm = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save form data to Firestore
      const docRef = await addDoc(collection(firestore, 'businessForms'), formData);
      console.log('Document written with ID: ', docRef.id);

      // Redirect to WhatsApp or handle success (optional)
      const { name, age, gender, email, message } = formData;
      const whatsappMessage = `Hello, my name is ${name} (Age: ${age}, Gender: ${gender}). My email is ${email}. Here is my message: ${message}`;
      const whatsappLink = `https://api.whatsapp.com/send/?phone=9059898900&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
      window.location.href = whatsappLink;

      // Clear form fields after submission
      setFormData({
        name: '',
        age: '',
        gender: '',
        email: '',
        message: ''
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden max-w-4xl w-full md:flex my-8 mx-4`}>
        {/* Side Image */}
        <div className="hidden md:block md:w-1/2 h-auto">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Business"
            className="object-cover w-full h-full"
            style={{ maxHeight: '100%', objectPosition: 'center' }}
          />
        </div>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Business Form</h2>
            <div className="mb-4">
              <label htmlFor="name" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ${isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                rows="4"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded transition duration-200 text-lg font-semibold ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;
