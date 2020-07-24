import React from 'react';
import { View, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import rocket from '../animations/rocket.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <View style={styles.container}>
    <Lottie
      resizeMode="contain"
      autoSize
      source={rocket}
      autoPlay
      loop
    />
  </View>
);

export default Loading;
