import React from 'react';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import styles from '../Home/styles';
import CardItem from './CardItem';
import ModalAdd from './ModalAddItem';
import { Item } from './type';

type Props = {
  titulo: string,
  itens: Item[],
  gruposId: string,
  buscarItens: () => void,
  removeItem: (itemId: string) => void,
}

const Lista = ({
  titulo,
  itens,
  gruposId,
  buscarItens,
  removeItem,
}: Props) => (
    <>
      <View style={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.title}>{titulo}</Text>
        <View>
          <ModalAdd 
            gruposId={gruposId} 
            buscarItens={buscarItens}
          />
        </View>
      </View>
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
