import React, { useState } from 'react';
import { firestore } from '../firebase'; // Adjust the path to your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const BusinessForm = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full md:flex">
        {/* Side Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://wallpaperaccess.com/full/2495155.jpg"
            alt="Business"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 md:w-1/2">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Business Form</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 mb-2">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 mb-2">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;
