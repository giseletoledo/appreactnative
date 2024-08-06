import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggleFavorite }) => {
    return (
      <Pressable onPress={onToggleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </Pressable>
    );
  };
  
  export default FavoriteButton;