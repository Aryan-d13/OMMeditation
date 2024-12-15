import { useAuthRequest } from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { saveUserSession } from './AuthService';

const useGoogleSignIn = () => {
  const [request, response, promptAsync] = useAuthRequest({
    clientId: '260504287597-93c9n8vbduc8jbluae84oomo673b1mmp.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  const auth = getAuth();

  const handleSignIn = async () => {
    if (response?.type === 'success') {
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const userCredential = await signInWithPopup(auth, credential);
        const user = userCredential.user;

        // Save session
        await saveUserSession(user);
        return user;
      } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
      }
    }
  };

  return { request, promptAsync, handleSignIn };
};

export default useGoogleSignIn;
