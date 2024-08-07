import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostList from '../components/PostList';
import postsData from '../data/posts.json'; // Importa o JSON com todos os posts
import { Post } from '../models/Post'; // Ajuste o caminho conforme sua estrutura

const FavoritesScreen: React.FC<{ favorites: string[] }> = ({ favorites }) => {
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);

  const loadPostsAndFavorites = useCallback(async () => {
    try {
      // Carregar posts do AsyncStorage
      const storedPosts = await AsyncStorage.getItem('posts');
      const postsFromStorage = storedPosts ? JSON.parse(storedPosts) : [];

      // Combinar posts do JSON e do AsyncStorage
      const allPosts = [...postsData, ...postsFromStorage];

      // Filtrar posts que estão na lista de favoritos
      const favoritePosts = allPosts.filter(post => favorites.includes(post.id));
      setFavoritePosts(favoritePosts);
    } catch (error) {
      console.error('Erro ao carregar posts ou favoritos:', error);
    }
  }, [favorites]);

  useEffect(() => {
    loadPostsAndFavorites();
  }, [loadPostsAndFavorites]);

  return (
    <View style={styles.container}>
      <PostList
        posts={favoritePosts}
        favorites={favorites}
        onToggleFavorite={() => {}} // Sem função de alternar favorito aqui
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

export default FavoritesScreen;


