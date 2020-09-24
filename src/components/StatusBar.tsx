import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Appbar } from 'react-native-paper';
import { themeDefault } from '../utils/colors';

type Props = {
  title: string,
  subtitle: string,
  children: any
};

const StatusBar = ({ title, subtitle, children }: Props) => (
  <Appbar.Header style={{ backgroundColor: themeDefault.purple }}>
    <Appbar.BackAction
      color="#FFF"
      onPress={() => Actions.pop()}
    />
    <Appbar.Content
      title={title}
      color="#FFF"
      subtitle={subtitle}
    />
    {children}
  </Appbar.Header>
);

StatusBar.defaultProps = {
  title: '',
  subtitle: '',
  children: undefined
}

export default StatusBar;
