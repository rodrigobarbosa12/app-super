import React from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import styles from './styles';
import CardGrupo from './CardGrupo';

const Lista = ({ grupos, buscarGrupos, alertRemoveGrupo }) => (
  <>
    <Text style={styles.title}>Grupos</Text>
    <Text style={styles.description}>Escolha um dos grupos</Text>
    <FlatList
      data={grupos}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={buscarGrupos}
      onEndReachedThreshold={0.2}
      style={styles.itemsList}
      renderItem={({ item }) => <CardGrupo grupo={item} alertRemoveGrupo={alertRemoveGrupo} />}
    />
  </>
);

export default Lista;
