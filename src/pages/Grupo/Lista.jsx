import React from 'react';
import {
  Text,
  FlatList,
} from 'react-native';
import styles from '../Home/styles';
import CardItem from './CardItem';

const Lista = ({
  titulo,
  itens,
  buscarItens,
  removeItem,
}) => (
  <>
    <Text style={styles.title}>{titulo}</Text>
    <Text style={styles.description}>Use sua lista como quiser</Text>
    <FlatList
      data={itens}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={buscarItens}
      onEndReachedThreshold={0.2}
      style={styles.itemsList}
      renderItem={({ item }) => <CardItem item={item} removeItem={removeItem} />}
    />
  </>
);

export default Lista;
