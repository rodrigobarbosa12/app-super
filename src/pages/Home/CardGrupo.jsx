
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Divider from '../../components/Divider';
import toRouteAuth from '../../utils/to-route-auth';
import colors from '../../utils/colors';
import styles from './styles';

const CardGrupo = ({ grupo, alertRemoveGrupo }) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={styles.buttonTrash}
      onPress={() => alertRemoveGrupo(grupo.id)}
    >
      <Feather name="trash" size={16} color={colors.danger} />
    </TouchableOpacity>
    <Text style={styles.cardGrupoName}>{grupo.nome}</Text>

    <Divider bottom={15} />

    <TouchableOpacity
      style={styles.detailsButton}
      onPress={() => toRouteAuth(Actions.Grupo, { gruposId: grupo.id, grupoNome: grupo.nome })}
    >
      <Text style={styles.detailsButtonText}>Ver itens</Text>
      <Feather name="arrow-right" size={16} color={colors.matteBlue} />
    </TouchableOpacity>
  </View>
);

export default CardGrupo;
