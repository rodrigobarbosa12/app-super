import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TOKEN_STORAGE } from './constants';

export const logOut = () => Actions.reset('Login');

const forAuthRoute = async (route: string, params: Object | null = {}) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  if (token) {
    Actions.push(route, params);
  } else {
    logOut();
  }
};

export const forAuthRoutePop = async (params?: { animated?: boolean }) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  if (token) {
    Actions.pop(params);
  } else {
    logOut();
  }
};

export const forAuthRouteReset = async (route: string, params: Object | null = {}) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);
  if (token) {
    Actions.reset(route, params);
  } else {
    logOut();
  }
};

export default forAuthRoute;
