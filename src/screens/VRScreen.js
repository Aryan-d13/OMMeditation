import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const VRScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://meditation-vr-video.web.app/Ind.html' }} // Replace with the hosted HTML URL
        style={styles.webView}
        allowsInlineMediaPlayback={true} // Enable inline playback
        mediaPlaybackRequiresUserAction={false} // Allow autoplay
        javaScriptEnabled={true} // Enable JavaScript for WebXR
        domStorageEnabled={true} // DOM storage for video assets
        onError={(e) => console.error('WebView error: ', e.nativeEvent)}
        onLoad={() => console.log('WebView loaded successfully')}
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
