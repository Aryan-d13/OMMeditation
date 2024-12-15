import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HabitItem = ({ habit, onComplete, onDelete }) => {
  const { title, streak, canCompleteToday } = habit;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.streak}>Streak: {streak}</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity 
          style={[styles.completeButton, !canCompleteToday && styles.disabledButton]} 
          onPress={onComplete} 
          disabled={!canCompleteToday}
        >
          <Text style={styles.completeButtonText}>
            {canCompleteToday ? 'Complete Today' : 'Done for Today'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HabitItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  streak: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  completeButton: {
    backgroundColor: '#48BB78',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  disabledButton: {
    backgroundColor: '#A0AEC0'
  },
  deleteButton: {
    marginLeft: 15
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#E53E3E',
    fontWeight: 'bold'
  }
});
