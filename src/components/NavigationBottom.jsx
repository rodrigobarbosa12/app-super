import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { themeDefault } from '../utils/colors';

import Home from '../pages/Main/Main';
import World from '../pages/World/World';
import Formulario from '../pages/Cadastros/Formulario';

const NavigationBottom = () => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'Home', title: 'Studios', icon: 'map' },
      { key: 'World', title: 'Novidades', icon: 'home' },
      { key: 'Formulario', title: 'Cadastrar', icon: 'account-circle' },
    ],
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: themeDefault.purple }}
      navigationState={state}
      shifting
      onIndexChange={(index) => setState({ ...state, index })}
      renderScene={BottomNavigation.SceneMap({
        Home,
        World,
        Formulario,
      })}
    />
  );
};

export default NavigationBottom;
