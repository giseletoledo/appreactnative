import React from 'react';
import { FlatList, View, Image, Text, StyleSheet } from 'react-native';
import { Post } from '../models/Post';
import FavoriteButton from './FavoriteButton';

interface PostListProps { 
    posts: Post[]; 
    favorites: string[];
    onToggleFavorite: (postId: string) => void;
 }

const PostList:React.FC<PostListProps> = ({ posts, favorites, onToggleFavorite }) => {
  const renderItem = ({ item } : { item: Post }) => {
  const isFavorite = favorites.includes(item.id);
return(
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
            isFavorite={isFavorite} 
            onToggleFavorite={() => onToggleFavorite(item.id)} 
          />
        </View>
        );
      };
      
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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
