import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const badges = {
  firstSession: require('../../assets/first-day.jpeg'),
  fiveDayStreak: require('../../assets/five-days.jpeg'),
  dedicatedMeditator: require('../../assets/Designer.jpeg'),
};

// Dynamic level calculation
const getLevel = (minutes) => {
  if (minutes < 50) return { level: 1, nextLevelMinutes: 50, badge: 'firstSession' };
  if (minutes < 100) return { level: 2, nextLevelMinutes: 100, badge: 'fiveDayStreak' };
  if (minutes < 200) return { level: 3, nextLevelMinutes: 200, badge: 'dedicatedMeditator' };
  return { level: 4, nextLevelMinutes: 500, badge: null }; // Levels can be extended
};

const ProgressTracker = ({ streak = 1, minutes = 0 }) => {
  const { level, nextLevelMinutes, badge } = getLevel(minutes);
  const progress = minutes / nextLevelMinutes;

  const earnedBadges = [];
  if (minutes > 0) earnedBadges.push(badge);
  if (streak >= 5 && !earnedBadges.includes('fiveDayStreak')) earnedBadges.push('fiveDayStreak');
  if (minutes >= 100 && !earnedBadges.includes('dedicatedMeditator')) earnedBadges.push('dedicatedMeditator');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {/* Level and Progress Bar */}
      <Text style={styles.levelText}>Level {level}</Text>
      <ProgressBar progress={progress} color="#87CEEB" style={styles.progressBar} />
      <Text style={styles.progressText}>
        {minutes}/{nextLevelMinutes} minutes to Level {level + 1}
      </Text>

      {/* Streak */}
      <Text style={styles.streakText}>🔥 {streak}-Day Streak</Text>

      {/* Badges */}
      <Text style={styles.badgesTitle}>Earned Badges</Text>
      <View style={styles.badgesContainer}>
        {earnedBadges.length > 0 ? (
          earnedBadges.map((badge, index) => (
            <Image
              key={index}
              source={badges[badge]}
              style={styles.badge}
              alt={badge}
            />
          ))
        ) : (
          <Text style={styles.noBadgesText}>No badges yet. Start meditating!</Text>
        )}
      </View>

      {/* Encouragement Message */}
      <Text style={styles.encouragement}>
        {streak === 1
          ? `Great start! You're on a 1-day streak. Keep it going!`
          : streak > 1
          ? `Amazing! You're on a ${streak}-day streak. Keep building your habit!`
          : `Let's start a streak today!`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#87CEEB',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  streakText: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  badge: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  noBadgesText: {
    fontSize: 14,
    color: '#666',
  },
  encouragement: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#87CEEB',
  },
});

export default ProgressTracker;
