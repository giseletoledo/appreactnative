import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import usersData from '../data/users.json'; // Supondo que seu JSON esteja aqui

interface User {
  id: string;
  nome: string;
  imgperfil: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      if (usersData && usersData.length > 0) {
        const firstUser = usersData.find(user => user.id === '1');
        if (firstUser) {
          setUser(firstUser);
        } else {
          console.error('Usuário com ID 1 não encontrado.');
        }
      } else {
        console.error('Não há usuários.');
      }
    };

    fetchUser();
  }, []);


  if (!user) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.imgperfil }} 
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Cria o efeito circular
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default UserProfile;
