
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Divider from '../../components/Divider';
import toRouteAuth from '../../utils/to-route-auth';
import colors from '../../utils/colors';
import styles from './styles';
import { Grupo } from './type';

type Props = {
  grupo: Grupo,
  alertRemoveGrupo: (grupoId: string) => void,
  usuariosId: string,
};

const CardGrupo = ({ grupo, alertRemoveGrupo, usuariosId }: Props) => (
  <View style={styles.item}>
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
      onPress={() => toRouteAuth('Grupo', { grupo })}
    >
      <Text style={styles.detailsButtonText}>Ver itens</Text>
      <Feather name="arrow-right" size={16} color={colors.matteBlue} />
    </TouchableOpacity>
  </View>
);

export default CardGrupo;
