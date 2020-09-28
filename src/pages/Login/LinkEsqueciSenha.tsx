import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import toRouteAuth from '../../utils/to-route-auth';

const styles = StyleSheet.create({
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 15,
  },
});

const LinkEsqueciSenha = () => (
  <TouchableOpacity
    style={styles.detailsButton}
    onPress={() => toRouteAuth('Profile')}
  >
    <Text style={styles.detailsButtonText}>
      Esqueci minha senha
    </Text>
  </TouchableOpacity>
);

export default LinkEsqueciSenha;
