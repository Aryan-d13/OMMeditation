import React, { useEffect } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { signInWithGoogle } from '../services/AuthService';

const LoginScreen = ({ navigation }) => {
  const { promptAsync, signIn } = signInWithGoogle();

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
      const user = await signIn();
      if (user) {
        console.log('User Info:', user);
        navigation.replace('Main'); // Navigate to TabNavigator
      }
    } catch (error) {
      console.error('Sign-In Error:', error);
      Alert.alert('Sign-In Error', error.message || 'Something went wrong!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to OM Meditation</Text>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

export default LoginScreen;
