import React from 'react';
import Lottie from 'lottie-react-native';
import empty from '../../animations/empty.json';
import {
  Text,
  FlatList,
  Animated,
  View,
} from 'react-native';
import styles from './styles';
import CardGrupo from './CardGrupo';
import { Grupo } from './type';

type Props = {
  grupos: Grupo[],
  buscarGrupos: () => void,
  alertRemoveGrupo: (gruposId: string) => void,
  usuariosId: string,
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Lista = ({ grupos, buscarGrupos, alertRemoveGrupo, usuariosId }: Props) => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true });
  return (
    <>
      <View style={{ paddingHorizontal: 32 }}>
        <Text style={styles.title}>Grupos</Text>
        <Text style={styles.description}>Escolha um dos grupos</Text>
      </View>
      {grupos.length <= 0
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
          data={grupos}
          scrollEventThrottle={10}
          // bounces={false}
          // showsVerticalScrollIndicator={false}
          // fadingEdgeLength={10}
          onEndReachedThreshold={0.2}
          style={styles.itemsList}
          keyExtractor={(item) => String(item.id)}
          initialNumToRender={1}
          {...{onScroll}}
          renderItem={({ item, index }) =>
            <CardGrupo
              grupo={item}
              index={index}
              y={y}
              alertRemoveGrupo={alertRemoveGrupo}
              usuariosId={usuariosId}
              />
          }
        />
      }
    </>
  );
};

export default Lista;
