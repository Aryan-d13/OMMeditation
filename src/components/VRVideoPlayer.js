import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video360View from 'react-native-360-video-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VRVideoPlayer = ({ videoPath }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={styles.container}>
      <Video360View
        style={styles.videoPlayer}
        source={{ uri: videoPath }}
        paused={isPaused}
        fullscreen={isFullscreen}
        onError={(error) => console.log('Video Error:', error)}
      />
      
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
          <Icon 
            name={isPaused ? 'play-arrow' : 'pause'} 
            size={30} 
            color="white" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleFullscreen} style={styles.controlButton}>
          <Icon 
            name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} 
            size={30} 
            color="white" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoPlayer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
  },
});

export default VRVideoPlayer;