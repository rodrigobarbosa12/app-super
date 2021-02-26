import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Routes from './src/Routes';

const fetchFonts = () => {
  return Font.loadAsync ({
    'Arial Rounded MT Bold': require ('./assets/fonts/Arial-Rounded-MT-Bold-Negrito.ttf'),
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />
  }

  return <Routes />;
};

export default App;
