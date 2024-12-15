import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WORK_DURATION = 25 * 60;  // 25 minutes in seconds
const BREAK_DURATION = 5 * 60;  // 5 minutes in seconds

const PomodoroTimerScreen = () => {
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const navigation = useNavigation();

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time is up for the current cycle
            clearInterval(intervalRef.current);
            if (mode === 'work') {
              // Switch to break mode
              setMode('break');
              setTimeLeft(BREAK_DURATION);
              setIsRunning(false);
            } else {
              // Completed break, move back to work
              setMode('work');
              setTimeLeft(WORK_DURATION);
              setIsRunning(false);
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(WORK_DURATION);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pomodoro Timer</Text>
      </View>

      <Text style={styles.modeText}>
        {mode === 'work' ? 'Focus Time' : 'Break Time'}
      </Text>
      <Text style={styles.timerText}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PomodoroTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20
  },
  backButton: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  backButtonText: {
    fontSize: 16,
    color: '#008CBA',
    fontWeight: '500'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 25 // To center title visually
  },
  modeText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 100 // Adjust based on header absolute positioning
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 2
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  }
});
