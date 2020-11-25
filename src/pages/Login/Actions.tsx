import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styleGlobal from '../styles';

Icon.loadFont();

type Props = {
  handleSubmit: () => void
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#7059c1',
    fontWeight: 'bold',
  },
});

const Actions = ({ handleSubmit }: Props) => (
  <View>
    <TouchableOpacity
      onPress={handleSubmit}
      style={styleGlobal.button}
    >
      <Text style={styles.text}>Entrar</Text>
    </TouchableOpacity>
  </View>
);

export default Actions;
