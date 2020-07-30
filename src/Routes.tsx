import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Login from './pages/Login/Login';
import SingUp from './pages/Login/SingUp';
import Home from './pages/Home/Home';
import Grupo from './pages/Grupo/Grupo';
// import Loading from './pages/Loading';

const Routes = () => (
  <Router>
    <Stack hideNavBar key="root">
      {/* <Scene key="Loading" component={Loading} /> */}
      <Scene key="Login" component={Login} />
      <Scene key="SingUp" component={SingUp} />

      <Scene key="Home" component={Home} />
      <Scene key="Grupo" component={Grupo} />
    </Stack>
  </Router>
);

export default Routes;
