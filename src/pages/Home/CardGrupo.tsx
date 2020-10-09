
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import forAuthRoute from '../../utils/for-auth-route';
import colors from '../../utils/colors';
import styles from './styles';
import { Grupo } from './type';

type Props = {
  lastElement: boolean,
  grupo: Grupo,
  alertRemoveGrupo: (grupoId: string) => void,
  usuariosId: string,
};

const CardGrupo = ({ lastElement, grupo, alertRemoveGrupo, usuariosId }: Props) => (
  <TouchableOpacity
    style={lastElement ? styles.lastItem : styles.item}
    onPress={() => forAuthRoute('Grupo', { grupo })}
  >
    <View>
      <>
        <Text style={styles.cardGrupoDate}>{moment(grupo.data).format('DD/MM/YYYY H:mm:ss')}</Text>
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
      </>
    </View>
  </TouchableOpacity>
);

export default CardGrupo;
