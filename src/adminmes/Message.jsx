import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Import Firestore instance
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import EnrollmentForm from '../enrollpages/EnrollmentForm'; // Import EnrollmentForm component

const Message = () => {
  const [teachers, setTeachers] = useState([]);
  const [businessForms, setBusinessForms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingBusinessForm, setEditingBusinessForm] = useState(null);

  // New state for enrollment form visibility and selected course
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // State for adding/editing teachers
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: '',
    qualifications: '',
    referralCode: '',
  });

  // State for adding/editing business forms
  const [newBusinessForm, setNewBusinessForm] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch teachers
      const teachersSnapshot = await getDocs(collection(firestore, 'teachers'));
      const fetchedTeachers = teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(fetchedTeachers);

      // Fetch business forms
      const businessFormsSnapshot = await getDocs(collection(firestore, 'businessForms'));
      const fetchedBusinessForms = businessFormsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBusinessForms(fetchedBusinessForms);

      // Fetch enrollments
      const enrollmentsSnapshot = await getDocs(collection(firestore, 'enrollments'));
      const fetchedEnrollments = enrollmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnrollments(fetchedEnrollments);

      // Fetch courses
      const coursesSnapshot = await getDocs(collection(firestore, 'courses'));
      const fetchedCourses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCourses(fetchedCourses);
    };

    fetchData();
  }, []);

  // Show enrollment form for a specific course
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  // Close enrollment form
  const handleCloseEnrollmentForm = () => {
    setShowEnrollmentForm(false);
    setSelectedCourse(null);
    setEditingEnrollment(null);
  };

  // Edit an enrollment
  const handleEditEnrollment = (enrollment) => {
    setEditingEnrollment(enrollment);
    setShowEnrollmentForm(true);
  };

  // Delete enrollment from Firestore
  const handleDeleteEnrollment = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'enrollments', id));
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
      alert('Enrollment deleted successfully!');
    } catch (error) {
      console.error('Error deleting enrollment:', error);
    }
  };

  // Edit teacher
  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({ ...teacher });
  };

  // Delete teacher from Firestore
  const handleDeleteTeacher = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'teachers', id));
      setTeachers(teachers.filter(teacher => teacher.id !== id));
      alert('Teacher deleted successfully!');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  // Edit business form
  const handleEditBusinessForm = (form) => {
    setEditingBusinessForm(form);
    setNewBusinessForm({ ...form });
  };

  // Delete business form from Firestore
  const handleDeleteBusinessForm = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'businessForms', id));
      setBusinessForms(businessForms.filter(form => form.id !== id));
      alert('Business form deleted successfully!');
    } catch (error) {
      console.error('Error deleting business form:', error);
    }
  };

  // Submit updates for teachers
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await updateDoc(doc(firestore, 'teachers', editingTeacher.id), newTeacher);
        alert('Teacher updated successfully!');
      } else {
        await addDoc(collection(firestore, 'teachers'), newTeacher);
        alert('Teacher added successfully!');
      }
      const teachersSnapshot = await getDocs(collection(firestore, 'teachers'));
      setTeachers(teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setNewTeacher({
        name: '',
        email: '',
        phone: '',
        subject: '',
        experience: '',
        qualifications: '',
        referralCode: '',
      });
      setEditingTeacher(null);
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  // Submit updates for business forms
  const handleBusinessFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBusinessForm) {
        await updateDoc(doc(firestore, 'businessForms', editingBusinessForm.id), newBusinessForm);
        alert('Business form updated successfully!');
      } else {
        await addDoc(collection(firestore, 'businessForms'), newBusinessForm);
        alert('Business form added successfully!');
      }
      const businessFormsSnapshot = await getDocs(collection(firestore, 'businessForms'));
      setBusinessForms(businessFormsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setNewBusinessForm({
        name: '',
        age: '',
        gender: '',
        email: '',
        message: '',
      });
      setEditingBusinessForm(null);
    } catch (error) {
      console.error('Error saving business form:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Messages Overview</h1>

      {/* Section for Teachers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Teachers</h2>
        <div className="space-y-4">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <div key={teacher.id} className="p-4 bg-blue-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {teacher.name}</p>
                <p className="text-lg text-black">Email: {teacher.email}</p>
                <p className="text-lg text-black">Phone: {teacher.phone}</p>
                <p className="text-lg text-black">Subject: {teacher.subject}</p>
                <p className="text-lg text-black">Experience: {teacher.experience} years</p>
                <p className="text-lg text-black">Qualifications: {teacher.qualifications}</p>
                <p className="text-lg text-black">Referral Code: {teacher.referralCode || 'N/A'}</p>
                <button onClick={() => handleEditTeacher(teacher)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteTeacher(teacher.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </div>
        {/* Form to Add or Edit Teacher */}
        <form onSubmit={handleTeacherSubmit} className="mt-4">
          <h2 className="text-2xl font-bold mb-4">{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
          {/* Add form fields here similar to newTeacher state */}
          {/* Example field */}
          <input
            type="text"
            placeholder="Name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="border p-2 mb-4"
          />
          {/* Other fields for email, phone, etc. */}
          <button type="submit" className="py-3 px-6 bg-blue-500 text-white rounded-lg">
            {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
          </button>
        </form>
      </section>

      {/* Section for Business Forms */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Business Forms</h2>
        <div className="space-y-4">
          {businessForms.length > 0 ? (
            businessForms.map((form) => (
              <div key={form.id} className="p-4 bg-green-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {form.name}</p>
                <p className="text-lg text-black">Age: {form.age}</p>
                <p className="text-lg text-black">Gender: {form.gender}</p>
                <p className="text-lg text-black">Email: {form.email}</p>
                <p className="text-lg text-black">Message: {form.message}</p>
                <button onClick={() => handleEditBusinessForm(form)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteBusinessForm(form.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No business forms found.</p>
          )}
        </div>
        {/* Form to Add or Edit Business Form */}
        <form onSubmit={handleBusinessFormSubmit} className="mt-4">
          <h2 className="text-2xl font-bold mb-4">{editingBusinessForm ? 'Edit Business Form' : 'Add New Business Form'}</h2>
          {/* Add form fields here similar to newBusinessForm state */}
          {/* Example field */}
          <input
            type="text"
            placeholder="Name"
            value={newBusinessForm.name}
            onChange={(e) => setNewBusinessForm({ ...newBusinessForm, name: e.target.value })}
            className="border p-2 mb-4"
          />
          {/* Other fields for age, gender, etc. */}
          <button type="submit" className="py-3 px-6 bg-blue-500 text-white rounded-lg">
            {editingBusinessForm ? 'Update Business Form' : 'Add Business Form'}
          </button>
        </form>
      </section>

      {/* Section for Enrollments */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Enrollments</h2>
        <div className="space-y-4">
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-4 bg-yellow-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Name: {enrollment.name}</p>
                <p className="text-lg text-black">Contact Number: {enrollment.contactNumber}</p>
                <p className="text-lg text-black">Stream: {enrollment.stream}</p>
                <p className="text-lg text-black">Qualification: {enrollment.qualification}</p>
                
                <p className="text-lg text-black">Course Title: {enrollment.courseTitle}</p>
                <p className="text-lg text-black">
                  Timestamp: {new Date(enrollment.timestamp.seconds * 1000).toLocaleString()}
                </p>
                <button onClick={() => handleEditEnrollment(enrollment)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteEnrollment(enrollment.id)} className="text-red-500 ml-2">Delete</button>
              </div>
            ))
          ) : (
            <p>No enrollments found.</p>
          )}
        </div>
      </section>

      {/* Section for Courses */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <div className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="p-4 bg-gray-100 rounded-lg shadow">
                <p className="text-lg font-semibold text-black">Title: {course.title}</p>
                <p className="text-lg text-black">Instructor: {course.instructor}</p>
                <p className="text-lg text-black">Price: {course.price}</p>
                <button onClick={() => handleEditCourse(course)} className="text-blue-500 ml-2">Edit</button>
                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 ml-2">Delete</button>
                <button onClick={() => handleEnrollClick(course)} className="text-green-500 ml-2">Enroll</button>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </section>

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <EnrollmentForm 
          course={selectedCourse} 
          onClose={handleCloseEnrollmentForm} 
          enrollment={editingEnrollment} // Pass enrollment for editing
        />
      )}

      {/* Forms for Adding/Editing Teachers and Business Forms are embedded in their sections */}
    </div>
  );
};

export default Message;
