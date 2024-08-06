import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsData from '../data/posts.json';
import PostList from '../components/PostList';

const HomeScreen = () => {
  const [posts, setPosts] = useState(postsData);
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
      // Remove from favorites
      newFavorites.splice(index, 1);
    } else {
      // Add to favorites
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
    alignItems: 'center'
  },
});

export default HomeScreen;
