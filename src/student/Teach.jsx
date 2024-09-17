import React, { useState } from 'react';
import { firestore } from '../firebase'; // Adjust the path to your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';

const Teach = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: '',
    qualifications: '',
    referralCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save form data to Firestore
      const docRef = await addDoc(collection(firestore, 'teachers'), formData);
      console.log('Document written with ID: ', docRef.id);

      // Redirect to WhatsApp or handle success (optional)
      const { name, email, phone, subject, experience, qualifications, referralCode } = formData;
      const message = `Hello, I would like to apply to teach on your platform. Here are my details:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Experience: ${experience} years
      Qualifications: ${qualifications}
      Referral Code: ${referralCode || 'N/A'}`;
      const whatsappUrl = `https://wa.me/9059898900?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Clear form fields after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        experience: '',
        qualifications: '',
        referralCode: ''
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-teal-500 text-gray-800 font-body">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/009/382/864/small/comic-zoom-focus-lines-background-free-vector.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) opacity(0.7)',
        }}
      ></div>

      <main className="container mx-auto py-16 px-8 flex flex-col items-center relative z-10">
        <section
          className="flex flex-col md:flex-row items-center md:items-start p-8 rounded-lg shadow-lg w-full max-w-6xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <div className="md:w-full md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Apply to Teach</h1>
            <p className="text-lg mb-6 text-gray-800">
              If you're passionate about teaching and have expertise in your subject area, we invite you to join our platform and share your knowledge with our students.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg mb-2 text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-2 text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-lg mb-2 text-gray-700 font-semibold">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-lg mb-2 text-gray-700 font-semibold">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-lg mb-2 text-gray-700 font-semibold">Experience (in years)</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="qualifications" className="block text-lg mb-2 text-gray-700 font-semibold">Qualifications</label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="referralCode" className="block text-lg mb-2 text-gray-700 font-semibold">Referral Code (optional)</label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 font-semibold rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 transition-colors duration-300"
              >
                Apply via WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Teach;
