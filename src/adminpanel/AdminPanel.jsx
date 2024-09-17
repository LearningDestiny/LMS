import React, { useState, useEffect } from 'react';
import { getCourses, updateCourse, addCourse, getCategories, updateCategory, addCategory } from '../services/apiService'; // Placeholder for your API service

const AdminPanel = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courseForm, setCourseForm] = useState({ title: '', instructor: '', rating: '', price: '', imageUrl: '', description: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await getCourses();
      const categoryData = await getCategories();
      setCourses(courseData);
      setCategories(categoryData);
    };
    fetchData();
  }, []);

  const handleCourseChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (courseForm.id) {
      await updateCourse(courseForm);
    } else {
      await addCourse(courseForm);
    }
    // Refresh courses list
    const courseData = await getCourses();
    setCourses(courseData);
    setCourseForm({ title: '', instructor: '', rating: '', price: '', imageUrl: '', description: '' });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (categoryForm.id) {
      await updateCategory(categoryForm);
    } else {
      await addCategory(categoryForm);
    }
    // Refresh categories list
    const categoryData = await getCategories();
    setCategories(categoryData);
    setCategoryForm({ name: '', imageUrl: '' });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Course Form */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
        <form onSubmit={handleCourseSubmit}>
          <input
            type="text"
            name="title"
            value={courseForm.title}
            onChange={handleCourseChange}
            placeholder="Title"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="instructor"
            value={courseForm.instructor}
            onChange={handleCourseChange}
            placeholder="Instructor"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="rating"
            value={courseForm.rating}
            onChange={handleCourseChange}
            placeholder="Rating"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="price"
            value={courseForm.price}
            onChange={handleCourseChange}
            placeholder="Price"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="imageUrl"
            value={courseForm.imageUrl}
            onChange={handleCourseChange}
            placeholder="Image URL"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            value={courseForm.description}
            onChange={handleCourseChange}
            placeholder="Description"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            {courseForm.id ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      </div>

      {/* Category Form */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
        <form onSubmit={handleCategorySubmit}>
          <input
            type="text"
            name="name"
            value={categoryForm.name}
            onChange={handleCategoryChange}
            placeholder="Category Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="imageUrl"
            value={categoryForm.imageUrl}
            onChange={handleCategoryChange}
            placeholder="Image URL"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            {categoryForm.id ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Display Lists */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Courses List</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="p-2 border border-gray-300 mb-2 rounded-lg">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p>{course.instructor}</p>
              <p>{course.price}</p>
              {/* Add edit functionality here */}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Categories List</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.name} className="p-2 border border-gray-300 mb-2 rounded-lg">
              <h3 className="text-xl font-bold">{category.name}</h3>
              {/* Add edit functionality here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
