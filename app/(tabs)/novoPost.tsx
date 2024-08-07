import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Post {
  userId: string;
  descricao: string;
  imgPublicacao: string;
  imgperfil: string; // Adiciona imgperfil
}

const CreatePostScreen: React.FC = () => {
  const [formData, setFormData] = useState<Post>({
    userId: '1', // Definindo o ID do usuário como '1'
    descricao: '',
    imgPublicacao: '',
    imgperfil: 'https://raw.githubusercontent.com/giseletoledo/appreactnative/main/imagens/perfil1.jpg', // imgperfil fixo para o usuário 1
  });

  const [errors, setErrors] = useState({
    descricao: '',
    imgPublicacao: '',
  });

  const validateForm = () => {
    const newErrors = {
      descricao: '',
      imgPublicacao: '',
    };
    let isValid = true;

    // Validação da descrição
    if (!formData.descricao) {
      newErrors.descricao = 'Descrição é obrigatória';
      isValid = false;
    }

    // Validação da imagem
    if (!formData.imgPublicacao) {
      newErrors.imgPublicacao = 'Imagem da publicação é obrigatória';
      isValid = false;
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.imgPublicacao)) {
      newErrors.imgPublicacao = 'URL da imagem inválida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const currentPosts = JSON.parse(await AsyncStorage.getItem('posts') || '[]');
        const updatedPosts = [
          ...currentPosts,
          { ...formData, id: new Date().toISOString(), likeada: false, likes: 0 }
        ];
        await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
        setFormData({
          userId: '1',
          descricao: '',
          imgPublicacao: '',
          imgperfil: 'https://raw.githubusercontent.com/giseletoledo/appreactnative/main/imagens/perfil1.jpg',
        });
        Alert.alert('Post criado com sucesso!');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro ao salvar o post.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar um novo post</Text>

      <TextInput
        style={[styles.input, errors.descricao ? styles.errorInput : {}]}
        placeholder="Descrição"
        value={formData.descricao}
        onChangeText={text => setFormData({ ...formData, descricao: text })}
      />
      {errors.descricao ? <Text style={styles.errorText}>{errors.descricao}</Text> : null}

      <TextInput
        style={[styles.input, errors.imgPublicacao ? styles.errorInput : {}]}
        placeholder="Imagem da Publicação"
        value={formData.imgPublicacao}
        onChangeText={text => setFormData({ ...formData, imgPublicacao: text })}
      />
      {errors.imgPublicacao ? <Text style={styles.errorText}>{errors.imgPublicacao}</Text> : null}

      <Button title="Criar Post" color='#FF0000' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default CreatePostScreen;

