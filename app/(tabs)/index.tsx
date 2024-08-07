import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import postsData from '../data/posts.json';
import PostList from '../components/PostList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Correção para o uso correto de useNavigation

type HomeScreenProps = {
  favorites: string[];
  toggleFavorite: (postId: string) => void;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ favorites, toggleFavorite }) => {
  const [posts, setPosts] = useState(postsData);
  const navigation = useNavigation();

  // Função para carregar posts
  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');

      if (storedPosts) {
        // Combina os posts carregados com os posts do postsData
        const allPosts = [...postsData, ...JSON.parse(storedPosts)];
        setPosts(allPosts);
      } else {
        // Se não houver posts no AsyncStorage, apenas use postsData
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  // Carregar posts na montagem do componente
  useEffect(() => {
    loadPosts();
  }, []); // Dependência vazia para carregar uma vez na montagem

  // Listener para atualizar quando retorna para a tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PostList
        posts={posts}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
});

export default HomeScreen;