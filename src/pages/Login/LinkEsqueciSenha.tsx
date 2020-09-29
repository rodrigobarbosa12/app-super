import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import forAuthRoute from '../../utils/for-auth-route';

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
    onPress={() => forAuthRoute('Profile')}
  >
    <Text style={styles.detailsButtonText}>
      Esqueci minha senha
    </Text>
  </TouchableOpacity>
);

export default LinkEsqueciSenha;
