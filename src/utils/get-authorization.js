
import { AsyncStorage } from 'react-native';
import { TOKEN_STORAGE } from './constants';

const getAuthorization = async () => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
};

export default getAuthorization;
