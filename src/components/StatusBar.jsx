import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Appbar } from 'react-native-paper';
import { themeDefault } from '../utils/colors';

const StatusBar = ({ title, subtitle, children }) => (
  <Appbar.Header style={{ backgroundColor: themeDefault.purple }}>
    <Appbar.BackAction
      color="#FFF"
      onPress={() => Actions.pop()}
    />
    <Appbar.Content
      title={title}
      subtitle={subtitle}
    />
    {children}
  </Appbar.Header>
);

export default StatusBar;
