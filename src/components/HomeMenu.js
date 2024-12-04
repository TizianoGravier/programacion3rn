import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Profile from '../screens/Perfil';
import NuevoPost from '../screens/NuevoPost';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#777777',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Post Nuevo"
        component={NuevoPost}
        options={{
          headerShown: false,
          title: 'Nuevo Post',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
