import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase'; // Assuming firestore is imported from firebase
import { collection, doc, getDoc } from 'firebase/firestore';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
        console.log('Current User:', user); 
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role || 'user'); // Set a default role if none exists
          } else {
            setRole('user'); // Default role if no document is found
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('user'); // Default role on error
        }
      } else {
        setCurrentUser(null);
        setRole(null); // Reset role to null if no user is authenticated
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  async function signup(email, password, username) {
    try {
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      await createUserDocument(credential.user, username);
      return credential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }
  
  async function createUserDocument(user, username) {
    try {
      await firestore.collection('users').doc(user.uid).set({
        username: username,
        email: user.email,
        role: 'user' // Assign default role
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    role,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
