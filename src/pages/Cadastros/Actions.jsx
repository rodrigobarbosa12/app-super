import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { themeDefault } from '../../utils/colors';

Icon.loadFont();

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: themeDefault.purple,
  },
});

const Actions = ({
  etapas,
  setEtapas,
  handleSubmit,
}) => (
  <View style={styles.action}>
    <TouchableOpacity
      onPress={() => setEtapas(etapas - 1)}
      style={styles.button}
    >
      <Icon
        name="arrow-left"
        size={20}
        color="#FFF"
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={handleSubmit}
      style={styles.button}
    >
      <Icon
        name="paper-plane"
        size={20}
        color="#FFF"
      />
    </TouchableOpacity>
  </View>
);

export default Actions;
