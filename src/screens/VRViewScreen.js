// src/screens/VRViewScreen.js

import React from 'react';
import { StyleSheet, View } from 'react-native';
import VRCamera from '../components/VRCamera';

const VRViewScreen = () => {
  return (
    <View style={styles.container}>
      <VRCamera />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for immersive experience
  },
});

export default VRViewScreen;
