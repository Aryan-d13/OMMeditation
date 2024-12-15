import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

// Google Sign-In logic using expo-auth-session
export const signInWithGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '260504287597-93c9n8vbduc8jbluae84oomo673b1mmp.apps.googleusercontent.com', // Your Expo Client ID
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // Replace with your Android Client ID from Firebase
    iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS Client ID from Firebase
    webClientId: '260504287597-93c9n8vbduc8jbluae84oomo673b1mmp.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      useProxy: true, // Ensures it works in Expo Go
    }),
  });

  const signIn = async () => {
    if (response?.type === 'success') {
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);

        // Authenticate with Firebase
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;

        // Save user details in Firestore and locally
        await saveUserDetails(user);
        await saveUserSession(user);

        return user;
      } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
      }
    } else {
      console.log('Google Sign-In was canceled or failed.');
      return null;
    }
  };

  return { request, promptAsync, signIn };
};

// Save user session locally
export const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('User session saved.');
  } catch (error) {
    console.error('Error saving user session:', error);
  }
};

// Retrieve user session locally
export const getUserSession = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return null;
  }
};

// Save user details in Firestore
export const saveUserDetails = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
    });
    console.log('User details saved successfully in Firestore');
  } catch (error) {
    console.error('Error saving user details:', error);
  }
};

// Logout functionality
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully.');
    await AsyncStorage.removeItem('user'); // Clear local session
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};
