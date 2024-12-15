// src/components/VRCard.js

import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VRCard = ({ item, navigation }) => {
  const pressAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.vrCard, { transform: [{ scale: pressAnim }] }]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('VRView')}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.vrImageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.vrImage} />
          ) : (
            <Ionicons name="videocam-outline" size={40} color="#4D648D" />
          )}
        </View>
        <Text style={styles.vrLabel}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  vrCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vrImageContainer: {
    backgroundColor: '#D3E4CD',
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  vrImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 10,
  },
  vrLabel: {
    color: '#4D648D',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default VRCard;
