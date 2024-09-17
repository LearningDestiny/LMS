// src/services/apiService.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

export const getCourses = async () => {
  const snapshot = await db.collection('courses').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCourse = async (course) => {
  const { id, ...data } = course;
  await db.collection('courses').doc(id).update(data);
};

export const addCourse = async (course) => {
  await db.collection('courses').add(course);
};

export const getCategories = async () => {
  const snapshot = await db.collection('categories').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCategory = async (category) => {
  const { id, ...data } = category;
  await db.collection('categories').doc(id).update(data);
};

export const addCategory = async (category) => {
  await db.collection('categories').add(category);
};
