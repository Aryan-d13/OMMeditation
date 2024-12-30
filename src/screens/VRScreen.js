import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const VRScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://meditation-vr-video.web.app/Ind.html' }} 
        style={styles.webView}
        allowsInlineMediaPlayback={true} // Enable inline playback for videos
        mediaPlaybackRequiresUserAction={false} // Allow autoplay
        javaScriptEnabled={true} // Ensure JavaScript is enabled for WebXR
        domStorageEnabled={true} // Enable DOM storage for assets
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
  },
});

export default VRScreen;
