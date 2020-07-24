
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TOKEN_STORAGE } from '../../utils/constants';

const logOut = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE);

  if (!await AsyncStorage.getItem(TOKEN_STORAGE)) {
    Actions.Login();
  }
};


export default logOut;
