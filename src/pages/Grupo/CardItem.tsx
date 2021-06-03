
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import DropdownMenuItem from './DropdownMenuItem';
import styles from '../Home/styles';
import { Item } from './type';
import { mascaraDinheiro } from '../../utils/mascara-dinheiro';

type Props = {
  lastElement: boolean,
  item: Item,
  alertRemoveGrupo: (itemId: string) => void
}

const CardItem = ({ lastElement, item, alertRemoveGrupo }: Props) => (
  <View style={lastElement ? styles.lastItem : styles.item}>
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
                mascaraDinheiro(item.valor)
              }
            </Text>
          </>
        : null
      }
    </View>
  </View>
);

export default CardItem;
