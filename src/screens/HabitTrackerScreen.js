import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../services/firebase'; // Adjust path as needed
import HabitItem from '../components/HabitItem'; // Adjust path if needed

const HabitTrackerScreen = () => {
  const [habits, setHabits] = useState([]);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'habits'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const habit = {
          id: docSnap.id,
          title: data.title,
          streak: data.streak,
          lastCompletedAt: data.lastCompletedAt ? data.lastCompletedAt.toDate() : null,
          createdAt: data.createdAt ? data.createdAt.toDate() : null
        };

        // Determine if the user can complete it today
        // If lastCompletedAt is today, they can't complete again
        const canCompleteToday = !isSameDay(habit.lastCompletedAt, new Date());
        habit.canCompleteToday = canCompleteToday;

        fetched.push(habit);
      });
      setHabits(fetched);
    });

    return () => unsubscribe();
  }, []);

  const addHabit = async () => {
    if (newHabitTitle.trim().length === 0) return;
    try {
      await addDoc(collection(db, 'habits'), {
        title: newHabitTitle.trim(),
        streak: 0,
        lastCompletedAt: null,
        createdAt: new Date()
      });
      setNewHabitTitle('');
    } catch (error) {
      console.log('Error adding habit:', error);
    }
  };

  const completeHabit = async (habit) => {
    // Only complete if canCompleteToday is true
    if (!habit.canCompleteToday) return;
    try {
      const habitDoc = doc(db, 'habits', habit.id);
      await updateDoc(habitDoc, {
        streak: habit.streak + 1,
        lastCompletedAt: new Date()
      });
    } catch (error) {
      console.log('Error completing habit:', error);
    }
  };

  const deleteHabit = async (id) => {
    try {
      const habitDoc = doc(db, 'habits', id);
      await deleteDoc(habitDoc);
    } catch (error) {
      console.log('Error deleting habit:', error);
    }
  };

  const renderItem = ({ item }) => (
    <HabitItem
      habit={item}
      onComplete={() => completeHabit(item)}
      onDelete={() => deleteHabit(item.id)}
    />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Habit Tracker</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new habit..."
          value={newHabitTitle}
          onChangeText={setNewHabitTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addHabit}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {habits.length > 0 ? (
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noHabitsText}>No habits yet. Add your first habit!</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default HabitTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F1',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
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
    marginRight: 25
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 50
  },
  addButton: {
    backgroundColor: '#FFB347',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  listContent: {
    paddingVertical: 10
  },
  noHabitsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666'
  }
});

function isSameDay(d1, d2) {
  if (!d1) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}
