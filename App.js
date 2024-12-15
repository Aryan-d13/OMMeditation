import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { getUserSession } from './src/services/AuthService';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import TabNavigator from './src/navigation/TabNavigator';
import PomodoroTimerScreen from './src/screens/PomodoroTimerScreen';
import ToDoListScreen from './src/screens/ToDoListScreen';
import HabitTrackerScreen from './src/screens/HabitTrackerScreen';
import DailyQuotesScreen from './src/screens/DailyQuotesScreen';
import MeditationSessionPlayer from './src/screens/MeditationSessionPlayer';
import VRViewScreen from './src/screens/VRViewScreen';
const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await getUserSession();
      setUser(userSession);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#87CEEB" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome" // Always start with the WelcomeScreen
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main">
          {() => <TabNavigator onLogout={() => setUser(null)} />}
        </Stack.Screen>
        <Stack.Screen name="PomodoroTimerScreen" component={PomodoroTimerScreen} />
        <Stack.Screen name="ToDoListScreen" component={ToDoListScreen} />
        <Stack.Screen name="HabitTrackerScreen" component={HabitTrackerScreen} />
        <Stack.Screen name="DailyQuotesScreen" component={DailyQuotesScreen} />
        <Stack.Screen name="MeditationSessionPlayer" component={MeditationSessionPlayer} />
        <Stack.Screen name="VRView" component={VRViewScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
