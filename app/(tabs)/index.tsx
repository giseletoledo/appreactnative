import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import postsData from '../data/posts.json';
import PostList from '../components/PostList';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = {
  favorites: string[];
  toggleFavorite: (postId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({favorites,toggleFavorite}) => {
  const [posts, setPosts] = useState(postsData);

  useEffect(() => {
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

    loadPosts();
  }, []); // Dependência vazia para carregar uma vez na montagem

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
