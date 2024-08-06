import React from 'react';
import { FlatList, View, Image, Text, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { Post } from '../models/Post';

interface PostListProps { 
    posts: Post[]; 
    favorites: string[];
    onToggleFavorite: (postId: string) => void;
 }

const PostList:React.FC<PostListProps> = ({ posts, favorites, onToggleFavorite }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={{ width: 420 }}>
            <Image
              source={{ uri: item.imgperfil }}
              style={styles.imgPerfil}
              resizeMode='cover'
            />
            <Image
              source={{ uri: item.imgPublicacao }}
              style={styles.imgPublicacao}
              resizeMode='cover'
            />
          </View>
          <Text>{item.descricao}</Text>
          <FavoriteButton 
            isFavorite={favorites.includes(item.id)} 
            onToggleFavorite={() => onToggleFavorite(item.id)} 
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
  imgPerfil: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 10
  },
  imgPublicacao: {
    width: 400,
    height: undefined,
    aspectRatio: 3/2,
    borderRadius: 10
  },
  
});

export default PostList;
