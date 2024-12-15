import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import audioMappings from '../audioMapping';
import imageMappings from '../imageMappings';

const MeditationSessionPlayer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { audio, title, image } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  const screenHeight = Dimensions.get('window').height; // To calculate dynamic height

  useEffect(() => {
    const loadAudio = async () => {
      const selectedAudio = audioMappings[audio];
      if (!selectedAudio) {
        console.error(`Audio file not found: ${audio}`);
        return;
      }

      const { sound } = await Audio.Sound.createAsync(selectedAudio);
      soundRef.current = sound;
    };

    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const selectedImage = imageMappings[image]; // Get the image from the mapping

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Display the Image */}
      {selectedImage && (
        <Image
          source={selectedImage}
          style={[styles.image, { height: screenHeight * 0.33 }]} // Set image height to 1/3rd of screen
        />
      )}

      <View style={styles.content}>
        <Text style={styles.description}>
          Enjoy your meditation session. Press play to begin.
        </Text>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeditationSessionPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#008CBA',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 25,
  },
  image: {
    width: '100%', // Full width of the screen
    resizeMode: 'contain', // Ensure the image is fully visible
    marginBottom: 20,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  playButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
