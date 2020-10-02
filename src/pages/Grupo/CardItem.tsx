
import React from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import moment from 'moment';
import DropdownMenuItem from './DropdownMenuItem';
import ScrollAnimatedView from '../../components/ScrollAnimatedView';
import styles from '../Home/styles';
import { Item } from './type';
import { mascaraDinheiro } from '../../utils/mascara-dinheiro';

type Props = {
  lastElement: boolean,
  index: number,
  y: Animated.Value,
  item: Item,
  alertRemoveGrupo: (itemId: string) => void
}

const CardItem = ({ lastElement, item, alertRemoveGrupo, index, y }: Props) => (
  <ScrollAnimatedView style={lastElement ? styles.lastItem : styles.item} index={index} y={y}>
    <Text style={styles.cardGrupoDate}>{moment(item.data).format('DD/MM/YYYY H:mm')}</Text>
    <View style={styles.buttonTrash}>
      <DropdownMenuItem
        alertRemoveGrupo={alertRemoveGrupo}
        itemId={item.id}
      />
    </View>
    <Text style={styles.itemProperty}>Produto:</Text>
    <Text style={styles.itemValue}>{item.nome}</Text>

    {item.descricao
      ? <>
          <Text style={styles.itemProperty}>Observação:</Text>
          <Text style={styles.itemValue}>{item.descricao}</Text>
        </>
      : null
    }

    <View style={{
      top: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      {item.quantidade
        ? <>
            <Text style={styles.itemProperty}>
              Quantidade:
            </Text>
            <Text style={styles.itemValueRow}>{item.quantidade}</Text>
          </>
        : null
      }
      {item.valor
        ? <>
            <Text style={styles.itemProperty}>
              Valor:
            </Text>
            <Text style={styles.itemValueRow}>
              {
                mascaraDinheiro(String(item.valor))
              }
            </Text>
          </>
        : null
      }
    </View>
  </ScrollAnimatedView>
);

export default CardItem;
