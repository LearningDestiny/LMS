import React, { useState } from 'react';
import { firestore } from '../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome Icon Component
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import WhatsApp Icon

const EnrollmentForm = ({ course, onClose }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [stream, setStream] = useState('');
  const [qualification, setQualification] = useState('');
  const [whatsappNumber] = useState('9059898900'); // Pre-filled WhatsApp number

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled before proceeding
    if (!name || !contactNumber || !stream || !qualification) {
      alert('Please fill out all the fields before enrolling.');
      return;
    }

    const enrollmentData = {
      name,
      contactNumber,
      stream,
      qualification,
      whatsappNumber,
      courseTitle: course.title,
      timestamp: new Date(), // Store the timestamp when the form is submitted
    };

    try {
      // Store data in Firebase Firestore
      const docRef = await addDoc(collection(firestore, 'enrollments'), enrollmentData);
      console.log("Document written with ID: ", docRef.id);

      const message = encodeURIComponent(
        `Hello, I would like to enroll in the course "${course.title}". My name is ${name}, my contact number is ${contactNumber}, I am studying ${stream}, and my qualification is ${qualification}.`
      );
      const url = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Redirect to WhatsApp
      window.location.href = url;

      // Optional: Close the form or navigate away
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Enroll in {course.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="stream">
              Stream/Branch of Study
            </label>
            <input
              type="text"
              id="stream"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="qualification">
              Qualification
            </label>
            <input
              type="text"
              id="qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <button
            type="submit"
            className="py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Enroll Now
          </button>
        </form>
        
        {/* WhatsApp Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 py-3 px-6 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 w-full"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
          Contact via WhatsApp
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EnrollmentForm;
