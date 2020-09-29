import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import identity from '../utils/identity';
import { connectUser, disconnect, subscribeToNotification } from '../utils/socket';
import DropdownMenuProfile from './DropdownMenuProfile';
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

const Header = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<string>('');
  const [notificacao, setNotificacao] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { id } = await identity();
      setUsuarioLogado(id);
      setupWebsocket();
    })();
  }, []);

  useEffect(() => {    
    subscribeToNotification((algo: any) => {
      console.warn('Notificação');
      setNotificacao([algo]);
    });
  }, [notificacao]);

  const setupWebsocket = () => {
    setNotificacao(['opa']);
    disconnect();

    connectUser(usuarioLogado);
  }

  return (
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
        <DropdownMenuProfile />
      </Appbar>
    </Appbar.Header>
  );
};

export default Header;
