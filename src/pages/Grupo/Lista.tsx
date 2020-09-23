import React from 'react';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import empty from '../../animations/empty.json';
import styles from '../Home/styles';
import CardItem from './CardItem';
import ModalAdd from './ModalAddItem';
import { Item } from './type';

type Props = {
  titulo: string,
  itens: Item[],
  gruposId: string,
  buscarItens: () => void,
  alertRemoveGrupo: (itemId: string) => void,
}

const Lista = ({
  titulo,
  itens,
  gruposId,
  buscarItens,
  alertRemoveGrupo,
}: Props) => (
    <>

      <View style={{paddingHorizontal: 32}}>
        <View style={{
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
      </View>
      {itens.length <= 0
        ? <View style={styles.empty}>
            <Lottie
              style={{ width: 250 }}
              resizeMode="contain"
              autoSize
              source={empty}
              autoPlay
            />
          </View>
         : <FlatList
            data={itens}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={buscarItens}
            onEndReachedThreshold={0.2}
            style={styles.itemsList}
            renderItem={({ item }) => <CardItem item={item} alertRemoveGrupo={alertRemoveGrupo} />}
          />
        }
    </>
  );

export default Lista;
