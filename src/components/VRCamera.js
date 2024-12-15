// // src/components/VRCamera.js

// import React from 'react';
// import {
//   ViroARScene,
//   ViroVideo,
//   ViroCamera,
//   ViroMaterials,
// } from '@viro-community/react-viro';
// import { StyleSheet } from 'react-native';

// // Define materials for the video sphere
// ViroMaterials.createMaterials({
//   videoMaterial: {
//     diffuseTexture: { uri: 'https://meditation-vr-video.web.app/VRVideo.mp4' }, // Replace with your Firebase video URL
//     shininess: 1.0,
//     lightingModel: 'Blinn',
//   },
// });

// const VRCamera = () => {
//   return (
//     <ViroARScene>
//       {/* 360 Video Sphere */}
//       <ViroVideo
//         source={{ uri: 'https://meditation-vr-video.web.app/VRVideo.mp4' }} // Replace with your Firebase video URL
//         position={[0, 0, 0]}
//         scale={[100, 100, 100]}
//         rotation={[0, 180, 0]}
//         loop={true}
//         autoplay={true}
//         muted={true}
//         ignoreEventHandling={true}
//         materials={['videoMaterial']}
//       />

//       {/* Camera with gyroscope support */}
//       <ViroCamera
//         position={[0, 0, 0]}
//         active={true}
//         lookInput={{ gyro: true }}
//       />
//     </ViroARScene>
//   );
// };

// export default VRCamera;
