import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AvatarProfile from './AvatarProfile';
import { themeDefault } from '../utils/colors';

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

const Header = () => (
  <Appbar.Header style={{ backgroundColor: themeDefault.purple }}>
    <Appbar style={styles.bottom}>
      <Appbar.Action
        icon="home"
        color="#FFF"
        onPress={() => console.log('Pressed archive')}
      />
      <Appbar.Action
        icon="chat"
        color="#FFF"
        onPress={() => console.log('Pressed mail')}
      />
      <Appbar.Action
        icon="bell"
        color="#FFF"
        onPress={() => console.log('Pressed label')}
      />
      <AvatarProfile />
    </Appbar>
  </Appbar.Header>
);

export default Header;
