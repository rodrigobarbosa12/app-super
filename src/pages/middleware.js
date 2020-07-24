// import { AsyncStorage } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { TOKEN_STORAGE } from '../utils/constants';
// // import jwt from 'jsonwebtoken';

// const authMiddleware = async () => {
// //   const authconfig = { secret: '7e7a440c62190f2e9e3ba8b4300eef02' };

//   const token = await AsyncStorage.getItem(TOKEN_STORAGE);

//   // Token não informado
//   if (!token) {
//     Actions.Login();
//   }

// // verifica Validade do token
// //   jwt.verify(token, authconfig.secret, (err) => {
// //     if (err) {
// //       // return res.status(401).send({ response: 'Token invalido' });
// //     }
// //   });
// };

// export const redirectLogged = async () => {
//   if (await AsyncStorage.getItem(TOKEN_STORAGE)) {
//     Actions.Main();
//   }
// };

// export default authMiddleware;
