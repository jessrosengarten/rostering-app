import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(); // Retrieve JWT token
    console.log('JWT Token:', token); // Debugging purposes
    return { user, token }; // Return user and token
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};
