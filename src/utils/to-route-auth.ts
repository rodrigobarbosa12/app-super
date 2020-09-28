import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TOKEN_STORAGE } from './constants';

const toRouteAuth = async (route: string, params: Object | null = {}) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  if (token) {
    Actions.reset(route, params);
  } else {
    Actions.Login();
  }
};

export default toRouteAuth;
