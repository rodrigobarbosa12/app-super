
import { AsyncStorage } from 'react-native';
import { USER_STORAGE } from './constants';

const identity = async () => {
  const user = await AsyncStorage.getItem(USER_STORAGE);

  if (!user) {
    return;
  }

  return JSON.parse(user);
};

export default identity;
