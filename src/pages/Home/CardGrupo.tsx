
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import Divider from '../../components/Divider';
import forAuthRoute from '../../utils/for-auth-route';
import colors from '../../utils/colors';
import styles from './styles';
import { Grupo } from './type';

type Props = {
  index: number,
  y: Animated.Value,
  grupo: Grupo,
  alertRemoveGrupo: (grupoId: string) => void,
  usuariosId: string,
};
const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;

export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;

const CardGrupo = ({ grupo, alertRemoveGrupo, usuariosId, index, y }: Props) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = - CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const translateY = Animated.add(Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * CARD_HEIGHT],
      outputRange: [0, -index * CARD_HEIGHT],
      extrapolateRight: 'clamp',
    }),
  ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp'
    })
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View style={[styles.item, { opacity, transform: [{ translateY }, { scale }] }]}>
      <Text style={styles.cardGrupoDate}>{moment(grupo.data).format('DD/MM/YYYY H:mm')}</Text>
      <View style={styles.buttonTrash}>
        {grupo.host === usuariosId && (
          <TouchableOpacity
            onPress={() => alertRemoveGrupo(grupo.id)}
          >
            <Feather name="trash" size={16} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cardGrupoName}>{grupo.nome}</Text>

      <Divider bottom={15} />

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => forAuthRoute('Grupo', { grupo })}
      >
        <Text style={styles.detailsButtonText}>Ver itens</Text>
        <Feather name="arrow-right" size={16} color={colors.matteBlue} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardGrupo;
