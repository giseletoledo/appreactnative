import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './index';
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
      <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF0000', // Cor ativa dos ícones
        tabBarInactiveTintColor: '#FFEBD4', // Cor inativa dos ícones
        tabBarStyle: {
          backgroundColor: '#FF7777', // Cor de fundo da barra de navegação
          borderTopWidth: 0, // Remover linha superior
        },
      }}

      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#FF0000'
            },
            headerTintColor: 'white',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name="Perfil" // nome da rota e arquivo no tabs
          component={ProfileScreen} //nome no import
          options={{
            headerStyle: {
              backgroundColor: '#FF0000'
            },
            headerTintColor: 'white',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            tabBarIcon: ProfileIcon,
          }}
        />
        <Tab.Screen
          name="novoPost" 
          component={CreatePostScreen}
          options={{
            headerStyle: {
              backgroundColor: '#FF0000'
            },
            headerTintColor: 'white',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            tabBarIcon: CreatePostIcon,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{
            headerStyle: {
              backgroundColor: '#FF0000'
            },
            headerTintColor: 'white',
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            tabBarIcon: FavoritesIcon,
          }}
        />
      </Tab.Navigator>
  );
}
