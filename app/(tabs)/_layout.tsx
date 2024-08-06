import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './home';
import ProfileScreen from './Perfil';
import CreatePostScreen from './novoPost';
import FavoritesScreen from './Favoritos'; // Importar a nova tela


const Tab = createBottomTabNavigator();

const HomeIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Ionicons name="home" color={color} size={size} />
);

const ProfileIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size} />
);

const CreatePostIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Ionicons name="add-circle" color={color} size={size} />
);

const FavoritesIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Ionicons name="heart" color={color} size={size} />
);

export default function TabLayout() {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name="Perfil" // nome da rota e arquivo no tabs
          component={ProfileScreen} //nome no import
          options={{
            tabBarIcon: ProfileIcon,
          }}
        />
        <Tab.Screen
          name="novoPost" 
          component={CreatePostScreen}
          options={{
            tabBarIcon: CreatePostIcon,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{
            tabBarIcon: FavoritesIcon,
          }}
        />
      </Tab.Navigator>
  );
}
