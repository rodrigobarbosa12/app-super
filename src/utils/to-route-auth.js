import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TOKEN_STORAGE } from './constants';

const toRouteAuth = async (go, params = null) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  if (token) {
    go(params);
  } else {
    Actions.Login();
  }
};

export default toRouteAuth;
