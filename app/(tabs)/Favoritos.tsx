import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsData from '../data/posts.json'; // Importa o JSON com todos os posts
import { Post } from '../models/Post';
import PostList from '../components/PostList';

type FavoriteScreenProps = {
  favorites: string[];
}

const FavoritesScreen: React.FC<FavoriteScreenProps> = ({ favorites }) => {

  const favoritePosts = postsData.filter( post => favorites.includes(post.id));

  return (
    <View style={styles.container}>
      <PostList
        posts={favoritePosts}
        favorites={favorites}
        // Handle toggling favorites and update favoriteIds accordingly
        onToggleFavorite={() => {}}
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
