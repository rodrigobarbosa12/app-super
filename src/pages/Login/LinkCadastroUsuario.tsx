import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 210,
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

const LinkCadastroUsuario = () => (
  <TouchableOpacity
    style={styles.detailsButton}
    onPress={() => Actions.SingUp()}
  >
    <Text style={styles.detailsButtonText}>
      Criar uma nova conta
    </Text>
    <Feather name="user" size={19} color="#FFF" />
  </TouchableOpacity>
);

export default LinkCadastroUsuario;
