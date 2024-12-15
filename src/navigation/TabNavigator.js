import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductivityScreen from '../screens/ProductivityScreen';
import VRScreen from '../screens/VRScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Productivity') iconName = 'compass-outline';
          else if (route.name === 'VR') iconName = 'headset-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#87CEEB',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false // Hides the tab bar
        }}/>
      <Tab.Screen name="Productivity" component={ProductivityScreen} options={{
          headerShown: false // Hides the tab bar
        }} />
      <Tab.Screen
        name="VR"
        component={VRScreen}
        options={{
          headerShown: false // Hides the tab bar
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;