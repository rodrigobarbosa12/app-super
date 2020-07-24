import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

Icon.loadFont();

const styles = StyleSheet.create({
  button: {
    padding: 15,
    justifyContent: 'center',
    borderRadius: 5,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 15,
    color: '#7059c1',
    fontWeight: 'bold',
  },
});

const Actions = ({ handleSubmit }) => (
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
