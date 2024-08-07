import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './index';
import ProfileScreen from './Perfil';
import CreatePostScreen from './novoPost';
import FavoritesScreen from './Favoritos';

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
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (postId: string) => {
    const newFavorites = [...favorites];
    const index = newFavorites.indexOf(postId);

    if (index !== -1) {
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push(postId);
    }

    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#FFEBD4',
        tabBarStyle: {
          backgroundColor: '#FF7777',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerStyle: { backgroundColor: '#FF0000' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: HomeIcon,
        }}
      >
        {() => <HomeScreen favorites={favorites} toggleFavorite={toggleFavorite} />}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: '#FF0000' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: ProfileIcon,
        }}
      />
      <Tab.Screen
        name="novoPost"
        component={CreatePostScreen}
        options={{
          headerStyle: { backgroundColor: '#FF0000' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: CreatePostIcon,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        options={{
          headerStyle: { backgroundColor: '#FF0000' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarIcon: FavoritesIcon,
        }}
      >
        {() => <FavoritesScreen favorites={favorites} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
