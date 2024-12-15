import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MeditationScrollCard from '../components/MeditationScrollCard';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading animation
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, 'meditation_categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoriesData);

        // Animate in the categories once data is loaded
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchCategories();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E3FDFD', '#E3F2FD', '#EBF5FB']}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.heading}>Welcome to Your Meditation Journey</Text>
      
      {/* Loading Animation */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2D4057" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        // Categories Content
        <Animated.ScrollView
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((category) => (
            <MeditationScrollCard
              key={category.id}
              title={category.title}
              cards={category.cards || []}
            />
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2D4057',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2D4057',
  },
});

export default HomeScreen;
