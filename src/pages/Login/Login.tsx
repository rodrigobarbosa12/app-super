import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { themeDefault } from '../../utils/colors';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: themeDefault.purple,
  },
});


const Login = () => (
  <>
    <View style={{
      height: 60,
      backgroundColor: '#FFF'
    }} />

    <View
      style={styles.container}
    >
      <SignIn />
    </View>
  </>
);

export default Login;
