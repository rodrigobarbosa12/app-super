import React from 'react';
import {
  Text,
  FlatList,
  View,
  Animated,
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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Lista = ({
  titulo,
  itens,
  gruposId,
  buscarItens,
  alertRemoveGrupo,
}: Props) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true });

  return (
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
         : <AnimatedFlatList
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={10}
            onEndReachedThreshold={0.2}
            style={styles.itemsList}
            initialNumToRender={1}
            {...{onScroll}}
            data={itens}
            keyExtractor={(item: Item) => String(item.id)}
            renderItem={({ item, index }: { item: Item, index: number}) =>
              <CardItem
                lastElement={(index === itens.length - 1) ? true : false}
                index={index}
                y={y}
                item={item}
                alertRemoveGrupo={alertRemoveGrupo}
              />
            }
          />
        }
    </>
  );
}

export default Lista;
