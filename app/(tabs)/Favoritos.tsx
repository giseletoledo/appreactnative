import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsData from '../data/posts.json'; // Importa o JSON com todos os posts
import { Post } from '../models/Post';
import PostList from '../components/PostList';

const FavoritesScreen: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIdsString = await AsyncStorage.getItem('favorites');
        if (favoriteIdsString) {
          const favoriteIds: string[] = JSON.parse(favoriteIdsString);
          const favoritePosts = postsData.filter(post => favoriteIds.includes(post.id));
          setFavoritePosts(favoritePosts);
          setFavoriteIds(favoriteIds);
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    loadFavorites();
  }, [favoriteIds]); // Atualiza quando favoriteIds muda

  return (
    <View style={styles.container}>
      <PostList
        posts={favoritePosts}
        favorites={favoriteIds}
        onToggleFavorite={() => {}} // Não precisa da função aqui
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

