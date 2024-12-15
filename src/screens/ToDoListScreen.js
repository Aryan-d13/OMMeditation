import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
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

import { db } from '../services/firebase'; // Adjust the path as needed

const ToDoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTodos = [];
      snapshot.forEach((docSnap) => {
        fetchedTodos.push({ id: docSnap.id, ...docSnap.data() });
      });
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (newTodoTitle.trim().length === 0) return;
    try {
      await addDoc(collection(db, 'todos'), {
        title: newTodoTitle.trim(),
        completed: false,
        createdAt: new Date()
      });
      setNewTodoTitle('');
    } catch (error) {
      console.log('Error adding todo:', error);
    }
  };

  const toggleTodoCompletion = async (id, currentValue) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, {
        completed: !currentValue
      });
    } catch (error) {
      console.log('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => toggleTodoCompletion(item.id, item.completed)}
        style={styles.checkboxContainer}
      >
        <Text style={styles.checkboxText}>
          {item.completed ? '☑' : '□'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My To-Do List</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noTodosText}>No tasks yet. Add your first task!</Text>
      )}
    </View>
  );
};

export default ToDoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8'
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
    marginRight: 25 // to center the title since back button takes space
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 50
  },
  addButton: {
    backgroundColor: '#008CBA',
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
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: '#CCC',
    borderWidth: 1
  },
  checkboxContainer: {
    marginRight: 10
  },
  checkboxText: {
    fontSize: 18
  },
  todoText: {
    flex: 1,
    fontSize: 16
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#999'
  },
  deleteButton: {
    marginLeft: 10
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold'
  },
  noTodosText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666'
  }
});
