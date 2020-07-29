import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/Routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
]);

const App = () => <Routes />;

export default App;
