import React, { useState } from 'react';
import { firestore } from '../firebase'; // Adjust the path to your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { useTheme } from '../App';

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
  const { isDarkMode } = useTheme();

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
    <div className={`relative min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} font-body`}>
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/009/382/864/small/comic-zoom-focus-lines-background-free-vector.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) opacity(0.7)',
        }}
      ></div>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        <section
          className={`w-full max-w-4xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="p-6 sm:p-8">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Apply to Teach</h1>
            <p className={`text-base sm:text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              If you're passionate about teaching and have expertise in your subject area, we invite you to join our platform and share your knowledge with our students.
            </p>

            <form onSubmit={handleSubmit} className={`space-y-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 sm:p-6 rounded-lg shadow-md`}>
              {[
                { name: 'name', label: 'Name', type: 'text' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel' },
                { name: 'subject', label: 'Subject', type: 'text' },
                { name: 'experience', label: 'Experience (in years)', type: 'number' },
                { name: 'referralCode', label: 'Referral Code (optional)', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`w-full p-2 ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-900'} rounded-md border ${isDarkMode ? 'border-gray-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    required={field.name !== 'referralCode'}
                  />
                </div>
              ))}
              
              <div>
                <label htmlFor="qualifications" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Qualifications</label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className={`w-full p-2 ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-900'} rounded-md border ${isDarkMode ? 'border-gray-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`w-full py-2 px-4 font-medium rounded-md ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors duration-300`}
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
