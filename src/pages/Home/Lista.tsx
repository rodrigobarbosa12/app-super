import React from 'react';
import Lottie from 'lottie-react-native';
import empty from '../../animations/empty.json';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import styles from './styles';
import CardGrupo from './CardGrupo';
import { Grupo } from './type';

type Props = {
  grupos: Grupo[],
  buscarGrupos: () => void,
  alertRemoveGrupo: (gruposId: string) => void
}

const Lista = ({ grupos, buscarGrupos, alertRemoveGrupo }: Props) => (
  <>
    <Text style={styles.title}>Grupos</Text>
    <Text style={styles.description}>Escolha um dos grupos</Text>
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
    : <FlatList
        data={grupos}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={buscarGrupos}
        onEndReachedThreshold={0.2}
        style={styles.itemsList}
        renderItem={({ item }) => <CardGrupo grupo={item} alertRemoveGrupo={alertRemoveGrupo} />}
      />
    }
  </>
);

export default Lista;
