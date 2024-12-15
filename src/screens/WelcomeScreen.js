import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const WelcomeScreen = ({ navigation }) => {
  const [touchEnabled, setTouchEnabled] = useState(false);

  useEffect(() => {
    // Enable touch after 5 seconds
    const timer = setTimeout(() => {
      setTouchEnabled(true);
    }, 5000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleContinue = () => {
    if (touchEnabled) {
      navigation.navigate('Main'); // Directly navigate to TabNavigator
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleContinue}>
      <LinearGradient colors={['#87CEEB', '#4682B4']} style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Animatable.Text animation="fadeInDown" delay={500} style={styles.text}>
          Take a deep breath
        </Animatable.Text>

        {touchEnabled && (
          <Animatable.Text
            animation="fadeInUp"
            duration={1000}
            style={styles.touchToContinue}>
            Touch anywhere to continue
          </Animatable.Text>
        )}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  touchToContinue: {
    position: 'absolute',
    bottom: 40,
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
