
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../../utils/colors';
import styles from '../Home/styles';
import { Item } from './type';

type Props = {
  item: Item,
  removeItem: (itemId: string) => void
}

const CardItem = ({ item, removeItem }: Props) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={styles.buttonTrash}
      onPress={() => removeItem(item.id)}
    >
      <Feather name="trash" size={20} color={colors.danger} />
    </TouchableOpacity>
    <Text style={styles.itemProperty}>Produto:</Text>
    <Text style={styles.itemValue}>{item.nome}</Text>

    <Text style={styles.itemProperty}>Descrição</Text>
    <Text style={styles.itemValue}>{item.descricao}</Text>

    <View style={{
      // flex: 1,
      top: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <Text style={styles.itemProperty}>
        Quantidade:
      </Text>
      <Text style={styles.itemValueRow}>{item.quantidade}</Text>
      <Text style={styles.itemProperty}>
        VALOR:
      </Text>
      <Text style={styles.itemValueRow}>
        {
                  Intl
                    .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                    .format(item.valor)
              }
      </Text>
    </View>
  </View>
);

export default CardItem;
