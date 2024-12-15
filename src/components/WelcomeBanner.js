import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeBanner = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome Back,</Text>
      <Text style={styles.name}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    margin: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomeBanner;
