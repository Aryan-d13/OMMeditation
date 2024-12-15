import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import imageMappings from '../imageMappings';

const MeditationCard = ({ title, image, description, audio, onPress }) => {
  const imageSource = imageMappings[image];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  title: {
    color: '#2D4057',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    color: '#4D648D',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default MeditationCard;
