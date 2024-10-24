import { auth } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const register = async (email, password) => {
  if (!email || !password) {
    throw new Error('Please fill in both email and password fields.');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Please fill in both email and password fields.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //console.log('Successfully logged in');
    Alert.alert(
      "Login Successful",
      "You have successfully logged in.",
      [{ text: "OK" }]
    );
    return userCredential.user;
  } catch (error) {
    //console.error('Login Error:', error);
    throw new Error('Error logging in. Please check your email and password.');
  }
};
