import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

Icon.loadFont();

type Props = {
  handleSubmit: () => void
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    justifyContent: 'center',
    width: 327,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
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
      style={styles.button}
    >
      <Text style={styles.text}>Entrar</Text>
    </TouchableOpacity>
  </View>
);

export default Actions;
