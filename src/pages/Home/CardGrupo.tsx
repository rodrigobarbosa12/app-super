
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  // Dimensions,
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import ScrollAnimatedView from '../../components/ScrollAnimatedView';
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

const CardGrupo = ({ grupo, alertRemoveGrupo, usuariosId, index, y }: Props) => (
  <ScrollAnimatedView style={styles.item} index={index} y={y}>
    <>
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
    </>
  </ScrollAnimatedView>
);

export default CardGrupo;
