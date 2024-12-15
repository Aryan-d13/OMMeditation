import React from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

const FloatingAnimation = () => {
  const move = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(move, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.imageContainer, { transform: [{ translateY: move }] }]}>
      <Image source={require('../../assets/cloud.png')} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 50,
  },
});

export default FloatingAnimation;
